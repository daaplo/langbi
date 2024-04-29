package com.yupi.springbootinit.config;

import org.jetbrains.annotations.NotNull;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.ThreadFactory;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

@Configuration
public class ThreadPoolExecutorConfig {

    @Bean
    public ThreadPoolExecutor threadPoolExecutor() {
        //创建线程管理
        ThreadFactory threadFactory = new ThreadFactory() {
            //开始线程数为1
            private int count = 1;

            @Override
            public Thread newThread(@NotNull Runnable r) {
                //创建新的线程
                Thread thread = new Thread(r);
                //线程名称及当前值
                thread.setName("线程" + count);
                //线程数递增
                count++;
                return thread;
            }
        };
        //创建新的线程池，线程池核心大小2，最大线程数4
        ThreadPoolExecutor threadPoolExecutor = new ThreadPoolExecutor(2, 4, 100, TimeUnit.SECONDS, new ArrayBlockingQueue<>(4), threadFactory);
        return threadPoolExecutor;
    }
}
