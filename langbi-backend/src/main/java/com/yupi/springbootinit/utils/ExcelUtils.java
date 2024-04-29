package com.yupi.springbootinit.utils;

import cn.hutool.core.collection.CollUtil;
import com.alibaba.excel.EasyExcel;
import com.alibaba.excel.support.ExcelTypeEnum;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.util.ResourceUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 *
 * Excel工具类
 */
@Slf4j
public class ExcelUtils {
    public static String excelToCsv(MultipartFile multipartFile) {
        // 创建一个变量来存储 Excel 文件中的数据
        List<Map<Integer, String>> list = null;

        try {
            // 使用 EasyExcel 读取上传的 Excel 文件并将其转换为 List<Map> 的格式
            list = EasyExcel.read(multipartFile.getInputStream())
                    .excelType(ExcelTypeEnum.XLSX)  // 指定 Excel 文件类型为 XLSX
                    .sheet()  // 选择默认的工作表
                    .headRowNumber(0)  // 指定 Excel 表头所在行号为 0
                    .doReadSync();  // 同步执行读取操作
        } catch (IOException e) {
            // 处理可能出现的 IOException 异常，并记录错误日志
            log.error("表格处理错误", e);
        }

        // 如果 Excel 数据为空，返回一个空字符串
        if (CollUtil.isEmpty(list)) {
            return "";
        }

        // 创建一个 StringBuilder 用于构建 CSV 数据
        StringBuilder stringBuilder = new StringBuilder();

        // 读取表头行并将其添加到 CSV 数据中
        LinkedHashMap<Integer, String> headerMap = (LinkedHashMap) list.get(0);
        List<String> headerList = headerMap.values().stream().filter(ObjectUtils::isNotEmpty).collect(Collectors.toList());
        stringBuilder.append(StringUtils.join(headerList, ",")).append("\n");

        // 读取数据行并将其添加到 CSV 数据中
        for (int i = 1; i < list.size(); i++) {
            LinkedHashMap<Integer, String> dataMap = (LinkedHashMap) list.get(i);
            List<String> dataList = dataMap.values().stream().filter(ObjectUtils::isNotEmpty).collect(Collectors.toList());
            stringBuilder.append(StringUtils.join(dataList, ",")).append("\n");
        }

        // 返回 CSV 数据的字符串表示
        return stringBuilder.toString();
    }
}
