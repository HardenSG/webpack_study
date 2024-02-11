/**
 * 更新版本的计算策略
 * @param {String} versionStr 字符串版本
 * @param {Number} tactics 更新版本阈值策略
 * @returns {String} 更新后版本值
 */
function countVersion(versionStr, tactics = 9) {
    let [major, middle, patch] = versionStr.split('.').map(v => Number(v))
    if (middle >= tactics && patch >= tactics) return [major + 1, 0, 0].join('.')

    if(patch >= tactics) return [major, middle + 1, 0].join('.')
    else return [major, middle, patch + 1].join('.')
}

module.exports = {
    countVersion
}