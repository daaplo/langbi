package com.yupi.springbootinit.manager;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class AiManagerTest {

    @Resource
    private AiManager aiManager;

    @Test
    void doChat() {
        String answer = aiManager.doChat(1772605626166796290L,"分析需求：\n"+
                "分析用户饭店营业额的增长情况\n"+
                "原始数据:\n"+
                "日期,营业额\n"+
                "1月，1000\n"+
                "2月，1500\n"+
                "3月，3000");
        System.out.println(answer);
    }
}