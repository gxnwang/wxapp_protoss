// pages/cart/cart.js
import { Cart } from 'cart-model.js'
var cart = new Cart
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //this._loadData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
    var cartData= cart.getCartDataFromLocal()
    //var countsInfo = cart.getCartTotalCounts(true) 
    var cal = this._calcTotalAccountAndCounts(cartData)
    this.setData({
      selectedCounts: cal.selectedCounts,
      cartData: cartData,
      selectedTypeCounts: cal.selectedTypeCounts,
      account: cal.account
    })
  },
  /**
   * 计算购物车中商品总价格以及总数量
   * @data 购物车所有商品数据
   * 
   * return object 
   */
  _calcTotalAccountAndCounts:function(data){
    var len= data.length,
        // 记录商品总价格
        account = 0,
        // 商品总数
        selectedCounts = 0,
        // 商品种类数量
        selectedTypeCounts = 0
    let multiple = 100

    for(let i = 0; i<len;i++){
      // 避免 0.05+0.01=0.060 000 000 000 000 005 的问题，乘以100*100
      if(data[i].selectedCounts){
        account += data[i].counts * multiple * Number(data[i].price) *multiple
        selectedCounts += data[i].counts
        selectedTypeCounts++
      }
    }

    return {
      selectedCounts: selectedCounts,
      selectedTypeCounts: selectedTypeCounts,
      account: account / (multiple* multiple)
    }

  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})