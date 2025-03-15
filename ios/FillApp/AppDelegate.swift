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
class AppDelegate: RCTAppDelegate {
  override func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
    // Initialize Firebase
    if let filePath = Bundle.main.path(forResource: "GoogleService-Info", ofType: "plist"), FileManager.default.fileExists(atPath: filePath) {
        if FirebaseApp.app() == nil {
            FirebaseApp.configure()
        }
    }
    GIDSignIn.sharedInstance.configuration = GIDConfiguration(clientID: FirebaseApp.app()?.options.clientID ?? "")
    ApplicationDelegate.shared.initializeSDK()
    ApplicationDelegate.shared.application(application, didFinishLaunchingWithOptions: launchOptions)

    self.moduleName = "FillApp"
    self.dependencyProvider = RCTAppDependencyProvider()

    // You can add your custom initial props in the dictionary below.
    // They will be passed down to the ViewController used by React Native.
    self.initialProps = [:]

    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }

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

  // Handle deep linking
  override func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
    return ApplicationDelegate.shared.application(app, open: url, options: options) || GIDSignIn.sharedInstance.handle(url)
  }

  // Handle orientation
  override func application(_ application: UIApplication, supportedInterfaceOrientationsFor window: UIWindow?) -> UIInterfaceOrientationMask {
    return .allButUpsideDown
  }
}
