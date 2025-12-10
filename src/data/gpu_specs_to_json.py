import pandas as pd
import json
import re
from pandas.api.types import is_integer, is_integer_dtype, is_float, is_float_dtype


class CustomJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, pd.Timestamp):
            return obj.isoformat()
        elif pd.isna(obj):
            return None
        return super().default(obj)


def convert_excel_to_js_object(excel_file_path, output_file_path):
    # 读取Excel文件
    dataframe = pd.read_excel(excel_file_path)

    # 生成TypeScript接口定义
    def generate_typescript_interface():
        interface_def = "export type GpuSpec = {\n"

        for column in dataframe.columns:
            # 简单推断类型（可以根据实际需求扩展）
            sample_value = dataframe[column].dropna().iloc[0] if not dataframe[column].dropna().empty else None

            if (
                    is_integer_dtype(dataframe[column])
                    or is_float_dtype(dataframe[column])
            ):
                ts_type = "number | undefined"
            elif (
                    is_integer(sample_value)
                    or is_float(sample_value)
            ):
                ts_type = "number | string | undefined"
            else:
                ts_type = "string | undefined"

            interface_def += f"    {column}: {ts_type}\n"

        interface_def += "}\n\n"
        return interface_def

    # 将DataFrame转换为字典列表
    gpu_data = dataframe.to_dict('records')
    key_regex = re.compile(r'"(\w+)": ')

    # 写入到TypeScript文件
    with open(output_file_path, 'w', encoding='utf-8') as f:
        f.write(generate_typescript_interface())

        # 逐行写入每条记录
        for i, record in enumerate(gpu_data):
            f.write(f"const Record{i}: GpuSpec = ")
            json_str = json.dumps(record, indent=4, ensure_ascii=False, cls=CustomJSONEncoder)
            json_str = re.sub(key_regex, r'\1: ', json_str)
            json_str = json_str.replace(" null", " undefined")
            json_str = json_str.replace(" NaN", " undefined")

            f.write(json_str)
            f.write("\n")

        f.write("export const defaultGpuSpecs: GpuSpec[] = [\n")
        for i, record in enumerate(gpu_data):
            f.write(f"    Record{i},")
            f.write("\n")
        # 结束数组
        f.write("];\n")


# 使用示例
if __name__ == "__main__":
    excel_file = "gpu_specs.xlsx"
    output_file = "gpu_specs.ts"
    convert_excel_to_js_object(excel_file, output_file)
