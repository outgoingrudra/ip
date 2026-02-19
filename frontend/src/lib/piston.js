// Code execution service using Judge0 API (free public instance)

const JUDGE0_API = "https://ce.judge0.com"; // Free public API - no key required!

const LANGUAGE_IDS = {
  javascript: 93, // Node.js 18.15.0
  python: 71,     // Python 3.10.0
  java: 62,       // Java 15.0.2
};

// Helper function for polling delay
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * @param {string} language - programming language
 * @param {string} code - source code to execute
 * @returns {Promise<{success:boolean, output?:string, error?: string}>}
 */
export async function executeCode(language, code) {
  try {
    const languageId = LANGUAGE_IDS[language];

    if (!languageId) {
      return {
        success: false,
        error: `Unsupported language: ${language}`,
      };
    }

    // Step 1: Submit code for execution
    const submissionResponse = await fetch(`${JUDGE0_API}/submissions?base64_encoded=false&wait=false`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source_code: code,
        language_id: languageId,
        stdin: "",
      }),
    });

    if (!submissionResponse.ok) {
      return {
        success: false,
        error: `Submission failed: ${submissionResponse.status}`,
      };
    }

    const { token } = await submissionResponse.json();

    // Step 2: Poll for results
    let attempts = 0;
    const maxAttempts = 10;
    
    while (attempts < maxAttempts) {
      const resultResponse = await fetch(`${JUDGE0_API}/submissions/${token}?base64_encoded=false`);
      
      if (!resultResponse.ok) {
        return {
          success: false,
          error: `Failed to get results: ${resultResponse.status}`,
        };
      }

      const result = await resultResponse.json();

      // Check if execution is complete (status ID > 2 means completed)
      // Status IDs: 1=In Queue, 2=Processing, 3=Accepted, 4=Wrong Answer, etc.
      if (result.status.id > 2) {
        // Success if status is 3 (Accepted)
        const success = result.status.id === 3;
        
        // Combine stdout and stderr
        const output = result.stdout || "";
        const error = result.stderr || result.compile_output || "";

        if (error) {
          return {
            success: false,
            output: output,
            error: error,
          };
        }

        return {
          success: success,
          output: output || "No output",
        };
      }

      // Wait before polling again
      await sleep(1000);
      attempts++;
    }

    return {
      success: false,
      error: "Execution timeout",
    };

  } catch (error) {
    return {
      success: false,
      error: `Failed to execute code: ${error.message}`,
    };
  }
}

// Helper function for file extension (kept for compatibility)
function getFileExtension(language) {
  const extensions = {
    javascript: "js",
    python: "py",
    java: "java",
  };

  return extensions[language] || "txt";
}