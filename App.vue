<script>
export default {
  onLaunch() {
    console.log('AI Coach app launched')
  }
}
</script>

<style>
page {
  min-height: 100%;
  background: #f6f7fb;
  color: #111827;
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif;
}
.container { padding: 28rpx; }
.card {
  background: #ffffff;
  border-radius: 28rpx;
  padding: 28rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 12rpx 40rpx rgba(15, 23, 42, 0.06);
}
.hero {
  color: #ffffff;
  background: linear-gradient(135deg, #111827 0%, #047857 100%);
  border-radius: 32rpx;
  padding: 34rpx;
  margin-bottom: 24rpx;
}
.title { font-size: 38rpx; font-weight: 800; line-height: 1.3; }
.subtitle { margin-top: 12rpx; color: #6b7280; font-size: 26rpx; line-height: 1.6; }
.hero .subtitle { color: rgba(255, 255, 255, 0.78); }
.row { display: flex; align-items: center; justify-content: space-between; gap: 18rpx; }
.grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20rpx; }
.pill { display: inline-flex; align-items: center; padding: 8rpx 18rpx; border-radius: 999rpx; background: #ecfdf5; color: #047857; font-size: 24rpx; }
.btn {
  border: 0;
  border-radius: 20rpx;
  background: #10b981;
  color: #ffffff;
  font-weight: 700;
  font-size: 28rpx;
  padding: 0 28rpx;
  height: 80rpx;
  line-height: 80rpx;
}
.btn.secondary { background: #111827; }
.input, .textarea, .picker {
  background: #f3f4f6;
  border-radius: 18rpx;
  padding: 20rpx;
  min-height: 48rpx;
  font-size: 28rpx;
}
.textarea { min-height: 150rpx; width: auto; }
.label { display: block; margin: 22rpx 0 12rpx; color: #374151; font-size: 26rpx; font-weight: 700; }
.metric { font-size: 40rpx; font-weight: 800; color: #111827; }
.muted { color: #6b7280; font-size: 24rpx; }
.divider { height: 1rpx; background: #e5e7eb; margin: 22rpx 0; }
.list-item { padding: 22rpx 0; border-bottom: 1rpx solid #eef2f7; }
.list-item:last-child { border-bottom: 0; }
</style>
