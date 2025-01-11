# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/share/android-sdk/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.

# If your project uses WebView with JS, uncomment the following
# and specify the fully qualified class name to the JavaScript interface
# class:
#-keepclassmembers class fqcn.of.javascript.interface.for.webview {
#   public *;
#}

# Keep the names of classes used for JSON serialization/deserialization
-keepclassmembers class * {
    @com.google.gson.annotations.SerializedName <fields>;
}

# Add any other rules specific to your project here
