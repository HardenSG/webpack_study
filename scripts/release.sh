#!/bin/bash

# 构建器
builder() {
    npm run dev
    $DEV_RESULT = $?

    npm run prod
    $PROD_RESULT = $?

    if [ $PROD_RESULT -ne 0 ]; then 
        echo "PROD build failure"
        exit $PROD_RESULT
    elif [ $DEV_RESULT -ne 0 ]; then
        echo "DEV build failure"
        exit $DEV_RESULT
    else
        echo "PROD & DEV build success"
    fi
}

# release信息
gitHelper() {
    git config user.email "2767525216@qq.com"
    git config user.name "HardenSG"
    node ./scripts/gitHelper.js
}

# changelog生成器
logGenertor() {
    npm run changelog
}

# 更新版本信息
updateVersion() {
    node ./scripts/updateVersion.js
}

# 上传npm
publishNpm() {
    npm config set registry https://registry.npmjs.org/
    node ./scripts/publish.js
}

resetLogic() {
    npm config set registry https://registry.npmmirror.com
}

# 主逻辑
main() {
    echo "===== changelog & commit ====="

    echo "1. 验证构建....."
    builder

    BUILD_RET=$?
    if [ $BUILD_RET -ne 0 ]; then   
        exit $BUILD_RET
    fi

    echo "2. 更新版本信息....."
    updateVersion

    echo "3. 生成changelog....."
    logGenertor

    echo "4. git actions"
    gitHelper

    echo "5. 上传npm"
    publishNpm

    echo "6. 恢复历史设置逻辑"
    resetLogic
    echo "release success🏅!!"
}

main