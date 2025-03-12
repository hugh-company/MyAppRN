package com.myapprn

import android.content.Context
import android.net.Uri
import android.view.SurfaceView
import android.widget.FrameLayout
import com.google.android.exoplayer2.ExoPlayer
import com.google.android.exoplayer2.SimpleExoPlayer
import com.google.android.exoplayer2.ui.PlayerView
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.UIManagerModule
import com.facebook.react.uimanager.annotations.ReactProp

class VideoPlayerView : SimpleViewManager<PlayerView>() {

    override fun getName(): String {
        return "VideoPlayerView"
    }

    override fun createViewInstance(reactContext: ThemedReactContext): PlayerView {
        val playerView = PlayerView(reactContext)
        val exoPlayer = SimpleExoPlayer.Builder(reactContext).build()
        playerView.player = exoPlayer
        return playerView
    }

    @ReactMethod
    fun setVideoSource(url: String, playerView: PlayerView) {
        val player = playerView.player
        val mediaItem = com.google.android.exoplayer2.MediaItem.fromUri(Uri.parse(url))
        player?.setMediaItem(mediaItem)
        player?.prepare()
        player?.play()
    }

    @ReactMethod
    fun pauseVideo(playerView: PlayerView) {
        val player = playerView.player
        player?.pause()
    }

    @ReactMethod
    fun resumeVideo(playerView: PlayerView) {
        val player = playerView.player
        player?.play()
    }

    @ReactMethod
    fun setSpeed(speed: Float, playerView: PlayerView) {
        val player = playerView.player
        val playbackParams = com.google.android.exoplayer2.PlaybackParameters(speed)
        player?.setPlaybackParameters(playbackParams)
    }

    // Hàm tính toán chiều cao tự động dựa trên chiều rộng và tỷ lệ 16:9
    @ReactMethod
    fun setAutoHeight(width: Int, playerView: PlayerView) {
        // Tính chiều cao tự động với tỷ lệ 16:9 (hoặc tỷ lệ khác)
        val aspectRatio = 9.0f / 16.0f
        val calculatedHeight = (width * aspectRatio).toInt()

        // Cập nhật chiều cao của PlayerView
        playerView.layoutParams.height = calculatedHeight
        playerView.requestLayout()
    }
}
