// const { Builder, By, until, WebDriver } = require("selenium-webdriver");
// const firefox = require("selenium-webdriver/firefox");
// const fs = require("fs");

// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
// // Setup Firefox WebDriver
// async function setupFirefoxDriver() {
//   let options = new firefox.Options();
//   // options.addArguments('--headless'); // Headless mode for GCP
//   options.addArguments("--window-size=1920,1200"); // Consistent window size
//   options.addArguments("--no-sandbox"); // For GCP/Linux
//   options.addArguments("--disable-dev-shm-usage"); // Prevent container crashes
//   options.addArguments(
//     "user-agent=Mozilla/5.0 (X11; Linux x86_64; rv:102.0) Gecko/20100101 Firefox/102.0"
//   );

//   let driver = await new Builder()
//     .forBrowser("firefox")
//     .setFirefoxOptions(options)
//     .build();

//   return driver;
// }

// // Retry action with a specified number of attempts
// async function retryAction(action, maxAttempts = 3, delayMs = 1000) {
//   for (let attempt = 1; attempt <= maxAttempts; attempt++) {
//     try {
//       await action();
//       return true;
//     } catch (error) {
//       console.log(`Attempt ${attempt} failed: ${error.message}`);
//       if (attempt === maxAttempts) {
//         console.log("Max attempts reached.");
//         return false;
//       }
//       await new Promise((resolve) => setTimeout(resolve, delayMs));
//     }
//   }
//   return false;
// }

// // Write to log file (equivalent to generalUtils.writeOnFile)
// function writeToLogFile(logFile, message, append = true) {
//   const timestamp = new Date().toLocaleString();
//   const logMessage = `${timestamp} ${message}\n`;
//   fs[append ? "appendFileSync" : "writeFileSync"](logFile, logMessage);
// }

// async function navigateDrawerAndInventory() {
//   let driver = await setupFirefoxDriver();
//   const logFile = "selenium_log.txt"; // Replace with your log file path
//   const drawerToggleButton = "drawerToggleButton__oj3"; // ID for drawer toggle
//   const navDrawerId = "navDrawer"; // ID for navigation drawer
//   const inventoryManagementFrame = "Inventory Management"; // ID for frame
//   const inventoryManagementBtn = "Inventory Management"; // ID for button
//   const isHeadless = false; // Set to true for headless mode (GCP)

//   try {
//     console.log("Starting navigation...");

//     // Navigate to the cloud platform (replace with actual URL)
//     await driver.get("https://ors-idm.mte5.oraclerestaurants.com/oidc-ui/");

//     // Wait for login page and perform login (replace with actual selectors)
//     await driver.wait(
//       until.elementLocated(By.id("user-name-input|input")),
//       15000
//     );
//     await driver
//       .findElement(By.id("user-name-input|input"))
//       .sendKeys("Support");
//     await driver.findElement(By.id("org-name-input|input")).sendKeys("atc");
//     await driver
//       .findElement(By.id("password-input|input"))
//       .sendKeys("P@$$w0rd");
//     await driver.findElement(By.id("signinBtn")).click();

//     // Wait for drawer toggle button to be visible
//     try {
//       await driver.wait(
//         until.elementsLocated(By.id(drawerToggleButton)),
//         15000
//       );
//       console.log("Drawer toggle button is visible.");
//     } catch (error) {
//       throw new Error(`Failed to find drawer toggle button: ${error.message}`);
//     }

//     // Wait for drawer toggle button to be clickable
//     try {
//       await driver.wait(until.elementLocated(By.id(drawerToggleButton)), 15000);
//       console.log("Drawer toggle button is clickable.");
//     } catch (error) {
//       throw new Error(`Drawer toggle button not clickable: ${error.message}`);
//     }

//     // Retry clicking the drawer toggle button
//     const clicked = await retryAction(async () => {
//       let toggleButton = await driver.findElement(By.id(drawerToggleButton));
//       await driver.executeScript("arguments[0].click();", toggleButton); // Use JS click for reliability
//     });

//     if (!clicked) {
//       const errorMessage = `${new Date().toLocaleString()} Failed to click drawer toggle button. Origin: OpenOHRA`;
//       writeToLogFile(logFile, errorMessage, true);
//       return;
//     }

//     // Check for navigation drawer
//     let navDrawers = await driver.findElements(By.id(navDrawerId));
//     if (navDrawers.length === 0) {
//       await driver.executeScript(
//         "arguments[0].click();",
//         await driver.findElement(By.id(drawerToggleButton))
//       );
//     } else {
//       let navDrawer = navDrawers[0];
//       let isDisplayed = await navDrawer.isDisplayed();
//       if (!isDisplayed) {
//         await driver.executeScript(
//           "arguments[0].click();",
//           await driver.findElement(By.id(drawerToggleButton))
//         );
//       }
//     }

//     // Navigate to inventory management
//     const checkInventory = await retryAction(async () => {
//       // Wait for inventory management frame
//       await driver.wait(
//         until.elementsLocated(By.partialLinkText(inventoryManagementFrame)),
//         15000
//       );
//       let frameElement = await driver.findElement(
//         By.partialLinkText(inventoryManagementFrame)
//       );
//       await driver.executeScript("arguments[0].click();", frameElement);
//     });

//     // Wait for inventory management button
//     await driver.wait(
//       until.elementsLocated(By.partialLinkText(inventoryManagementBtn)),
//       15000
//     );
//     let inventoryButton = await driver.findElements(
//       By.partialLinkText(inventoryManagementBtn)
//     );
//     console.log(`Inventory button found: ${inventoryButton.length}`);
//     console.log({ inventoryButton: JSON.stringify(inventoryButton) });

//     // await driver.executeScript("arguments[0].click();", inventoryButton[1]);


//     // await delay(3000); // Wait for 1 second before clicking the button
//     // await driver.wait(
//     //     until.elementsLocated(inventoryButton[1]),
//     //     15000
//     //   );

//     await inventoryButton[1].click(); // Click the button

//     const clicked_ = await retryAction(async () => {
//         let toggleButton = await driver.findElement(By.id(drawerToggleButton));
//         await driver.executeScript("arguments[0].click();", toggleButton); // Use JS click for reliability
//       });
  
//       if (!clicked_) {
//         const errorMessage = `${new Date().toLocaleString()} Failed to click drawer toggle button. Origin: OpenOHRA`;
//         writeToLogFile(logFile, errorMessage, true);
//         return;
//       }
  
//       // Check for navigation drawer
//       let navDrawers_ = await driver.findElements(By.id(navDrawerId));
//       if (navDrawers_.length === 0) {
//         await driver.executeScript(
//           "arguments[0].click();",
//           await driver.findElement(By.id(drawerToggleButton))
//         );
//       } else {
//         let navDrawer = navDrawers_[0];
//         let isDisplayed = await navDrawer.isDisplayed();
//         if (!isDisplayed) {
//           await driver.executeScript(
//             "arguments[0].click();",
//             await driver.findElement(By.id(drawerToggleButton))
//           );
//         }
//       }
  
//       // Navigate to inventory management

  
//       // Wait for inventory management button
//       await driver.wait(
//         until.elementsLocated(By.partialLinkText(inventoryManagementBtn)),
//         15000
//       );
//       let inventoryButton_ = await driver.findElements(
//         By.partialLinkText(inventoryManagementBtn)
//       );
//       console.log(`Inventory button found: ${inventoryButton_.length}`);
//       console.log({ inventoryButton_: JSON.stringify(inventoryButton_) });
  
//       // await driver.executeScript("arguments[0].click();", inventoryButton_[1]);
  
  
//     //   await delay(3000); // Wait for 1 second before clicking the button
//       // await driver.wait(
//       //     until.elementsLocated(inventoryButton_[1]),
//       //     15000
//       //   );
  
//       await inventoryButton_[1].click();

//     await driver.executeScript(`window.open('about:blank');`);

//     await driver.wait(async () => { let handles = await driver.getAllWindowHandles(); return handles.length === 2; }, 15000)


//     // Keep browser open
//     console.log('Script completed. Browser will remain open for inspection.');
//     console.log('Press Ctrl+C to terminate the script.');

//     await delay(10000); // Wait for 10 seconds before closing the browser
//     // Optional: Keep the process alive (for local runs)
//     // if (isHeadless) {
//     //     await new Promise(() => {}); // Prevents script from exiting
//     // }


//   } catch (error) {
//     console.error("Error:", error);
//     writeToLogFile(logFile, `Error: ${error.message}`, true);
//     // Capture screenshot
//     try {
//       let screenshot = await driver.takeScreenshot();
//       fs.writeFileSync("error_screenshot.png", screenshot, "base64");
//     } catch (screenshotError) {
//       console.error("Failed to capture screenshot:", screenshotError);
//     }
//     // Capture page source
//     try {
//       let pageSource = await driver.getPageSource();
//       fs.writeFileSync("error_page_source.html", pageSource);
//     } catch (sourceError) {
//       console.error("Failed to capture page source:", sourceError);
//     }
//   } finally {
//     try {
//       await driver.quit();
//     } catch (quitError) {
//       console.error("Error quitting driver:", quitError);
//     }
//   }
// }

// setInterval(()=> navigateDrawerAndInventory() , 1000*60*1);


const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Parse JSON and XML requests
app.use(bodyParser.json());
app.use(bodyParser.text({ type: 'application/xml' }));

// PSP endpoint for OPI requests
app.post('/payment/process', (req, res) => {
    console.log('Received OPI Request:', req.body);
    // For testing, always return success
    res.json({ success: true });
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`PSP server running on http://localhost:${port}`);
});