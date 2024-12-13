import { ref } from "vue";
import { isEmpty, Xthrottle } from "@/utils/MxTool.js";
import { ElMessage, ElMessageBox } from "element-plus";
// 操作封装
export function useOperation(tableRef, funcOptions, refreshTableData) {
  async function executeOperation(apiUrl, idArr, operationName) {
    try {
      const response = await apiUrl({ ids: idArr });

      if (response.status) {
        ElMessage.success(`${operationName}成功`);

        if (typeof refreshTableData === "function") {
          refreshTableData(); // 刷新表格数据
        }
      } else {
        ElMessage.error(`${operationName}失败: ${response.data.message}`);
      }
    } catch (error) {
      console.error(`${operationName}时发生错误:`, error);
      ElMessage.error(`请求失败，请重试`);
    }
  }

  function handleOperation(type, idArr) {
    const operation = funcOptions[type];
    if (isEmpty(operation)) {
      return ElMessage.error(`请配置${type}参数`);
    }

    const { apiUrl, title = type } = operation;

    if (typeof apiUrl !== "function") {
      return ElMessage.error(`apiUrl必须是一个函数`);
    }

    executeOperation(apiUrl, idArr, title);
  }

  function funcCheck(idArr) {
    handleOperation("check", idArr);
  }

  function funcReject(idArr) {
    handleOperation("reject", idArr);
  }

  function funcDelete(idArr) {
    handleOperation("delete", idArr);
  }

  function deleteConfirm(id = undefined, tips) {
    if (isEmpty(id)) return ElMessage.error("ID参数错误");

    ElMessageBox.confirm(`[${tips || id}]：确定要删除该数据吗?`, "温馨提示", {
      // autofocus: false,
      draggable: true,
      type: "warning",
      cancelButtonText: "取消",
      confirmButtonText: "确定",
    })
      .then(() => {
        // 模拟删除数据
        handleOperation("delete", [id]);
      })
      .catch(() => {});
  }

  /**
   * 根据指定字段提取字段值数组
   * @param {Array} array - 输入的数组
   * @param {String} field - 要提取的字段名
   * @returns {Array} - 包含字段值的数组
   */
  function groupArrayByField(array, field) {
    if (!Array.isArray(array)) {
      throw new Error("传入的第一个参数必须是一个数组");
    }
    if (typeof field !== "string") {
      throw new Error("传入的第二个参数必须是一个字符串");
    }

    return array
      .map((item) => item[field])
      .filter((value) => value !== undefined);
  }

  function batchOperation(code) {
    const batchData = tableRef.value.getSelectionRows();
    const idArr = groupArrayByField(batchData, "id");

    if (isEmpty(idArr)) {
      return ElMessage({
        message: "请选择要操作的数据",
        grouping: true,
        type: "warning",
      });
    }

    const funcLists = {
      check: () => funcCheck(idArr),
      reject: () => funcReject(idArr),
      delete: () => funcDelete(idArr),
      delete: () => funcDelete(idArr),
    };

    const titleLists = {
      check: "您确定要执行批量审核操作吗？",
      reject: "您确定要执行批量退回操作吗？",
      delete: "您确定要执行批量删除操作吗？",
    };

    const action = funcLists[code];

    if (action) {
      ElMessageBox.confirm(titleLists[code], "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return action();
        })
        .catch(() => {});
    } else {
      console.log(`未定义的按钮${code}`);
    }
  }

  async function getTableData(query) {
    const operation = funcOptions["getTableData"];

    if (isEmpty(query)) {
      return ElMessage.error(`请传递query参数`);
    }
    if (isEmpty(operation)) {
      return ElMessage.error(`请配置${type}参数`);
    }

    const { apiUrl, title = type } = operation;

    if (typeof apiUrl !== "function") {
      return ElMessage.error(`apiUrl必须是一个函数`);
    }

    try {
      const response = await apiUrl(query);

      if (response.status) {
        console.log(response.data);
        // tableRef.value.setData(response.data);
        // ElMessage.success("表格数据已刷新");
      } else {
        ElMessage.error(`获取表格数据失败: ${response.message}`);
      }
    } catch (error) {
      console.error("获取表格数据时发生错误:", error);
      ElMessage.error("获取表格数据失败，请重试");
    }
  }

  return {
    batchOperation,
    getTableData,
    deleteConfirm,
  };
}
