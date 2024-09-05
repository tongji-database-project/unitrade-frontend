import { defineStore } from 'pinia';

export const useOrderStore = defineStore('order', {
  state: () => ({
    reviews: new Map<string, string>() // 使用 Map 来管理订单ID和评价内容
  }),
  actions: {
    loadReview(orderId: string) {
      const review = localStorage.getItem(`review_${orderId}`);
      if (review) {
        this.reviews.set(orderId, review);
      }
    },
    saveReview(orderId: string, reviewText: string) {
      this.reviews.set(orderId, reviewText);
      localStorage.setItem(`review_${orderId}`, reviewText);
    },
    clearReview(orderId: string) {
      this.reviews.delete(orderId);
      localStorage.removeItem(`review_${orderId}`);
    }
  }
});
