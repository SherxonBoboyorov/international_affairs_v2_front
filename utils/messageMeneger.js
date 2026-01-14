import { ElMessage } from "element-plus";

export default (text, type = "success", duration = 3000, isHtml = false) => {
  ElMessage({
    dangerouslyUseHTMLString: isHtml,
    duration: duration,
    message: text,
    showClose: true,
    type: type,
  });
};
