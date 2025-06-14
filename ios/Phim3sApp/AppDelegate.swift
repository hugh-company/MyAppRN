import UIKit
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider
import AuthenticationServices
import SafariServices
import FBSDKCoreKit
import Firebase
import UserNotifications
import GoogleSignIn

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
  var window: UIWindow?

  var reactNativeDelegate: ReactNativeDelegate?
  var reactNativeFactory: RCTReactNativeFactory?

  func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
  ) -> Bool {
    // Initialize Firebase
    if let filePath = Bundle.main.path(forResource: "GoogleService-Info", ofType: "plist"), FileManager.default.fileExists(atPath: filePath) {
        if FirebaseApp.app() == nil {
            FirebaseApp.configure()
        }
    }
    GIDSignIn.sharedInstance.configuration = GIDConfiguration(clientID: FirebaseApp.app()?.options.clientID ?? "")
    ApplicationDelegate.shared.initializeSDK()
    ApplicationDelegate.shared.application(application, didFinishLaunchingWithOptions: launchOptions)

    let delegate = ReactNativeDelegate()
    let factory = RCTReactNativeFactory(delegate: delegate)
    delegate.dependencyProvider = RCTAppDependencyProvider()

    reactNativeDelegate = delegate
    reactNativeFactory = factory

    window = UIWindow(frame: UIScreen.main.bounds)

    factory.startReactNative(
      withModuleName: "Phim3sApp",
      in: window,
      launchOptions: launchOptions
    )

    return true
  }

  func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
    // Handle deep linking for Facebook and Google Sign-In
    return ApplicationDelegate.shared.application(app, open: url, options: options) ||
           GIDSignIn.sharedInstance.handle(url)
  }
}

class ReactNativeDelegate: RCTDefaultReactNativeFactoryDelegate {
  override func sourceURL(for bridge: RCTBridge) -> URL? {
    self.bundleURL()
  }

  override func bundleURL() -> URL? {
#if DEBUG
    RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
#else
    Bundle.main.url(forResource: "main", withExtension: "jsbundle")
#endif
  }
}
