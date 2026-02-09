// WebGLBridge.jslib
// Place this file in your Unity project at: Assets/Plugins/WebGL/WebGLBridge.jslib
//
// This JavaScript plugin bridges Unity C# code to the React website.
// It uses react-unity-webgl's event dispatch system to send events
// from Unity back to React components.
//
// The function below is called from C# via [DllImport("__Internal")]
// and dispatches a "HandInComplete" event that React listens for
// via addEventListener("HandInComplete", callback).

mergeInto(LibraryManager.library, {

  // Called from HandInManager.cs when the hand-in interaction completes.
  // Dispatches the "HandInComplete" event to react-unity-webgl's event system.
  //
  // Parameters:
  //   experience (int)    - The XP reward amount (passed as number)
  //   messagePtr (string) - Pointer to the NPC message string (auto-marshaled by Unity)
  NotifyHandInComplete: function (experience, messagePtr) {
    var message = UTF8ToString(messagePtr);

    // react-unity-webgl v9 listens for events dispatched via this global function.
    // The event name "HandInComplete" must match what's used in addEventListener()
    // on the React side.
    if (typeof window.dispatchReactUnityEvent === "function") {
      window.dispatchReactUnityEvent("HandInComplete", experience, message);
    } else {
      console.warn("[WebGLBridge] dispatchReactUnityEvent not found. Is react-unity-webgl loaded?");
    }
  }

});
