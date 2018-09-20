// pages/order/order.js
import {Cart} from '../cart/cart-model.js'
import {Order} from '../order/order-model.js'
import {Address} from '../../utils/address.js'

var cart = new Cart
var address = new Address 

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
    var productsArr
    this.data.account = options.account
    productsArr = cart.getCartDataFromLocal(true)
    this.setData({
      productsArr: productsArr,
      account: options.account,
      orderStatus: 0
    })
  
    address.getAddress((res)=>{
    
      this._bindAddressInfo(res)
     
    })
   
  },
  editAddress: function(event){
    var that = this
    wx.chooseAddress({
      success: function (res){
        var addressInfo = {
          name: res.userName,
          mobile: res.telNumber,
          totalDetail: address.setAddressInfo(res)
        }
        that._bindAddressInfo(addressInfo)

        address.submitAddress(res,(flag)=>{
          if(!flag){
            that.showTips('操作提示','地址信息更新失败！')
          }
        })
      }
    })
  },
  /**
   * 提示窗口
   * @title {string} 标题
   * @content {string} 内容
   * @flag {bool} 是否跳转到“我的”页面 
   * 
   */
  showTips: function(title,content,flag){
    wx.showModal({
      title: title,
      content: content,
      showCancel: false,
      success: function(res){
        if(flag){
          wx.switchTab({
            url: '/pages/my/my',
          })
        }
      }
    })
  },

  /** 绑定地址信息 */
  _bindAddressInfo: function(addressInfo){
    
    this.setData({
      addressInfo: addressInfo
    })
  },

  pay: function(){
    if(!this.data.addressInfo){
      this.showTips('下单提示','请填写您的收货地址')
      return
    }
    if(this.data.orderStatus == 0){
      this._firstTimePay()  // 创建订单并支付
    } else {
      this._oneMoresTimePay()  // 订单创建后的支付
    }
  },

  /** 第一次支付 */
  _firstTimePay: function(){
    var orderInfo = [],
        productInfo = this.data.productsArr,
        order = new Order
    for (let i=0;i<productInfo.length;i++){
      orderInfo.push({
        product_id: productInfo[i].id,
        count: productInfo[i].counts
      })
    }

    var that = this
    // 支付分两步，第一步是生成订单号，然后根据订单号支付
    order.doOrder(orderInfo,(data)=>{
      // 订单生成成功
      if(data.pass) {
        // 更新订单状态
        var id = data.order_id
        that.data.id = id
        that.data.fromCartFlag = false

        // 开始支付
        that._execPay(id)
      }else{
        that._orderFial(data) // 下单失败
      }

    })
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