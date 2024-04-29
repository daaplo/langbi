package com.yupi.springbootinit.model.vo;

import lombok.Data;

/**
 * 智能数据分析的返回结果
 */
@Data
public class BiResponse {

    private String genChart;

    private String genResult;

    private Long chartId;

}
