#import "AppDelegate.h"
#import <AuthenticationServices/AuthenticationServices.h>
#import <SafariServices/SafariServices.h>
#import <FBSDKCoreKit/FBSDKCoreKit-Swift.h>
#import <React/RCTLinkingManager.h>
#import <React/RCTBundleURLProvider.h>
#import <Firebase.h>
#import <UserNotifications/UserNotifications.h>
#import <GoogleSignIn/GoogleSignIn.h>
@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  // Initialize Firebase
 
  if ([FIRApp defaultApp] == nil) {
      [FIRApp configure];
    }
  [FBSDKApplicationDelegate.sharedInstance initializeSDK];
  [[FBSDKApplicationDelegate sharedInstance] application:application
                       didFinishLaunchingWithOptions:launchOptions];
  // Initialize Facebook SDK
//  [[FBSDKApplicationDelegate sharedInstance] application:application didFinishLaunchingWithOptions:launchOptions];
  
  self.moduleName = @"MyAppRN";
  self.initialProps = @{};

  [super application:application didFinishLaunchingWithOptions:launchOptions];
  return YES;
}

// Handle deep linking
- (BOOL)application:(UIApplication *)application openURL:(nonnull NSURL *)url options:(nonnull NSDictionary<NSString *,id> *)options {
//  [[FBSDKApplicationDelegate sharedInstance] application:application openURL:url options:options] ||
  return   [[FBSDKApplicationDelegate sharedInstance] application:application openURL:url options:options] ||[GIDSignIn.sharedInstance handleURL:url];
}

// Bundle URL for React Native
- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
