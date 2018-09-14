// pages/category/category.js
import {
  Category
} from 'category-model.js'

var category = new Category
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentItemsIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._loadData();
  },

  _loadData: function () {
    category.getCategoryType((categoryData) => {
      this.setData({
        categoryTypeArr: categoryData,
      })
      /* 获取分类信息的同时获取第一个分类信息下的商品 */
      category.getProductsByCategory(
        categoryData[0].id, (productData) => {
          var dataOjb = {
            products: productData,
            topImgUrl: categoryData[0].img.url,
            title: categoryData[0].name
          }

          this.setData({
            categoryProducts: dataOjb
          })
        })
    })

  },
  onProductsItemTap: function (event) {
    var id = category.getDataSet(event, 'id')
    wx.navigateTo({
      url: '../product/product?id=' + id,
    })
  },
  changeCategory: function (event) {
    var id = category.getDataSet(event, 'id')
    var index = category.getDataSet(event, 'index')

    this.getProductsByCategory(id, index);
  },

  getProductsByCategory: function (id, index) {
    category.getProductsByCategory(id, (productData) => {
      var dataOjb = {
        products: productData,
        topImgUrl: this.data.categoryTypeArr[index].img.url,
        title: this.data.categoryTypeArr[index].name
      }
      this.setData({
        categoryProducts: dataOjb,
        currentItemsIndex: index
      })
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