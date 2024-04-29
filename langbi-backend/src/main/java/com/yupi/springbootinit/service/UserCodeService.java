package com.yupi.springbootinit.service;

import com.yupi.springbootinit.model.entity.UserCode;
import com.baomidou.mybatisplus.extension.service.IService;

/**
* @author 李作浪
* @description 针对表【user_code(用户)】的数据库操作Service
* @createDate 2024-04-19 15:57:16
*/
public interface UserCodeService extends IService<UserCode> {

    /**
     * 查看用户有无调用次数
     * @param userId
     * @return
     */
    UserCode getUserCodeByUserId(long userId);
}
