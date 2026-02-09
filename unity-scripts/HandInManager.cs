// HandInManager.cs
// Place this script on a GameObject named "GameManager" in your Unity scene.
// This script handles communication between the React website and the Unity WebGL build.
//
// Setup:
// 1. Create an empty GameObject in your scene and name it "GameManager"
// 2. Attach this script to that GameObject
// 3. Assign your UI references in the Inspector
// 4. Build for WebGL
//
// Communication flow:
// - React calls SendMessage("GameManager", "TriggerHandIn", itemName) via react-unity-webgl
// - Unity processes the hand-in interaction (NPC window, animations, etc.)
// - When complete, Unity calls NotifyHandInComplete() which dispatches an event back to React
// - React receives the "HandInComplete" event with experience and NPC message

using UnityEngine;
using UnityEngine.UI;
using System.Runtime.InteropServices;

public class HandInManager : MonoBehaviour
{
    [Header("UI References")]
    [SerializeField] private GameObject npcWindow;
    [SerializeField] private GameObject inventoryPanel;
    [SerializeField] private GameObject handInButton;
    [SerializeField] private GameObject xpPopup;
    [SerializeField] private Text npcNameText;
    [SerializeField] private Text itemNameText;
    [SerializeField] private Text xpText;
    [SerializeField] private Text npcCommentText;

    [Header("Hand-In Settings")]
    [SerializeField] private int experienceReward = 100;
    [SerializeField] private string npcComment = "I'll review this with great interest. Your dedication is impressive.";

    // Import the JavaScript bridge function (only available in WebGL builds)
    [DllImport("__Internal")]
    private static extern void NotifyHandInComplete(int experience, string message);

    private string currentItemName;
    private bool isHandingIn = false;

    private void Start()
    {
        // Hide all UI initially - React will trigger when ready
        if (npcWindow != null) npcWindow.SetActive(false);
        if (xpPopup != null) xpPopup.SetActive(false);
    }

    /// <summary>
    /// Called from React via SendMessage when the user clicks the Formal Note.
    /// This is the entry point for the hand-in interaction.
    /// </summary>
    /// <param name="itemName">The name of the item being handed in</param>
    public void TriggerHandIn(string itemName)
    {
        currentItemName = itemName;

        // Show the NPC interaction window
        if (npcWindow != null) npcWindow.SetActive(true);
        if (inventoryPanel != null) inventoryPanel.SetActive(true);
        if (handInButton != null) handInButton.SetActive(true);

        // Update UI text
        if (npcNameText != null) npcNameText.text = "Shawn";
        if (itemNameText != null) itemNameText.text = itemName;

        Debug.Log($"[HandInManager] TriggerHandIn called with item: {itemName}");
    }

    /// <summary>
    /// Called when the user clicks the "Hand In" button in the Unity UI.
    /// Wire this up to your Hand In button's OnClick event in the Inspector.
    /// </summary>
    public void OnHandInClicked()
    {
        if (isHandingIn) return;
        isHandingIn = true;

        Debug.Log($"[HandInManager] Handing in: {currentItemName}");

        // Start hand-in animation/sequence
        StartCoroutine(HandInSequence());
    }

    private System.Collections.IEnumerator HandInSequence()
    {
        // Disable the button during animation
        if (handInButton != null) handInButton.SetActive(false);

        // Play hand-in animation (item disappearing, etc.)
        // Add your animation logic here
        yield return new WaitForSeconds(0.8f);

        // Show XP popup
        if (xpPopup != null)
        {
            xpPopup.SetActive(true);
            if (xpText != null) xpText.text = $"+{experienceReward} XP";
            if (npcCommentText != null) npcCommentText.text = npcComment;
        }

        // Wait for player to see the result
        yield return new WaitForSeconds(2.0f);

        // Notify React that the hand-in is complete
        SendCompletionToReact();
    }

    /// <summary>
    /// Sends the completion event back to React via the JavaScript bridge.
    /// </summary>
    private void SendCompletionToReact()
    {
        Debug.Log($"[HandInManager] Sending completion: XP={experienceReward}, Message={npcComment}");

#if UNITY_WEBGL && !UNITY_EDITOR
        NotifyHandInComplete(experienceReward, npcComment);
#else
        // In the editor, just log the completion
        Debug.Log("[HandInManager] NotifyHandInComplete would be called in WebGL build");
#endif
    }
}
