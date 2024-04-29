package com.yupi.springbootinit.controller;

import cn.hutool.json.JSONUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Profile;
import org.springframework.web.bind.annotation.*;
import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ThreadPoolExecutor;


/**
 * 帖子接口
 *
 * @author <a href="https://github.com/XFxiaolang">星风小浪</a>
 * 
 */
@RestController
@RequestMapping("/queue")
@Slf4j
@Profile({"dev","local"})
public class QueueController {
   @Resource
    private ThreadPoolExecutor threadPoolExecutor;
   @GetMapping("/add")
    public void add(String name){
       CompletableFuture.runAsync(() ->{
           log.info("任务在执行中： "+ name + ",执行人" + Thread.currentThread().getName());
           try{
               //休眠10分钟
               Thread.sleep(600000);
           }catch (InterruptedException e){
               e.printStackTrace();
           }
       },threadPoolExecutor);
   }
   @GetMapping("/get")
    public String get(){
       //线程状态信息
       Map<String,Object> map = new HashMap<>();
       //线程长度
       int size = threadPoolExecutor.getQueue().size();
       map.put("队列长度",size);
       long taskCount = threadPoolExecutor.getTaskCount();
       //将任务总数放入Map中
       map.put("任务总数",size);
       //获取已完成的任务数量
       long completedTaskCount = threadPoolExecutor.getCompletedTaskCount();
       map.put("已完成任务数",completedTaskCount);
       //获取正在执行的线程数
       int activeCount =threadPoolExecutor.getActiveCount();
       map.put("正在工作的线程数",activeCount);
       return JSONUtil.toJsonStr(map);
   }
}
