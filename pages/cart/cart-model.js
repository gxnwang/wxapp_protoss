import {Base} from '../../utils/base.js'
class Cart extends Base{
  constructor(){
    super()
    this._storgeKeyName = 'cart'
  }

  add(item,counts){
    var cartData = this.getCartDataFromLocal()
    var isHasInfo = this._isHasThatOne(item.id,cartData)
    if(isHasInfo.index == -1){
      item.counts = counts
      item.selectStatus = true  // 购物车商品选择状态
      cartData.push(item)
    }else{
      cartData[isHasInfo.index].counts +=counts
    }
    wx.setStorageSync(this._storgeKeyName, cartData)
  }
  /**
   * 获取购物车所有商品的数量总和
   * @flag bool 
   *    true  考虑商品选择状态
   *    false 忽略商品选中状态，返回所有商品总和
   */
  getCartTotalCounts(flag){
    var data = this.getCartDataFromLocal()
    var counts = 0
    for (let i=0;i<data.length;i++){
      if(flag){
        if(data[i].selectStatus){
          counts += data[i].counts
        }
      }else{
        counts += data[i].counts
      }
    }
    return counts
  }

  /**
   * 从缓存中读取购物车数据
   */
  getCartDataFromLocal(){
    var res = wx.getStorageSync(this._storgeKeyName)
    return res?res:[]
  }


  /**
   * 判断某个商品是否已经被添加到购物车中，并且返回这个商品的数据以及所在数组的序号
   * @id 商品id号
   * @arr 从缓存中读取的购物车信息
   * return object 
   */
  _isHasThatOne(id,arr){
    var item,
        result = {index:-1}
    for(let i=0;i<arr.length;i++){
      item = arr[i]
      if(item.id == id){
        result = {
          index: i,
          data: item
        }
        break
      }
    }
    return result
  }

  _changeCounts(id,counts){
    var cartData = this.getCartDataFromLocal(),
        hasInfo  =this._isHasThatOne(id,cartData)
    if(hasInfo.index != -1){
      if(hasInfo.data.counts >1 ){
        cartData[hasInfo.index].counts += counts
      }

    }
    // 更新本地缓存
    wx.setStorageSync(this._storgeKeyName, cartData)
  }

  addCounts(id){
    this._changeCounts(id,1)
  }

  cutCounts(id){
    this._changeCounts(id,-1)
  }

}
export{Cart}