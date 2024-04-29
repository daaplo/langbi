package com.yupi.springbootinit.service.impl;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yupi.springbootinit.common.ErrorCode;
import com.yupi.springbootinit.exception.BusinessException;
import com.yupi.springbootinit.exception.ThrowUtils;
import com.yupi.springbootinit.model.entity.UserCode;
import com.yupi.springbootinit.service.UserCodeService;
import com.yupi.springbootinit.mapper.UserCodeMapper;
import org.springframework.stereotype.Service;

/**
* @author 李作浪
* @description 针对表【user_code(用户)】的数据库操作Service实现
* @createDate 2024-04-19 15:57:16
*/
@Service
public class UserCodeServiceImpl extends ServiceImpl<UserCodeMapper, UserCode>
    implements UserCodeService{

    @Override
    public UserCode getUserCodeByUserId(long userId) {
        if (userId < 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        QueryWrapper<UserCode> wrapper = new QueryWrapper<>();
        wrapper.eq("userId", userId);
        UserCode userCode = this.getOne(wrapper);
        ThrowUtils.throwIf(userCode == null, ErrorCode.NULL_ERROR, "此用户不存在");
        return userCode;
    }
}




