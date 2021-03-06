export const getVerifyEmailTemplate = (code: string): string => {
	return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=Edge">
  <style type="text/css">
    body,
    p,
    div {
      font-family: inherit;
      font-size: 14px;
    }

    body {
      color: #000000;
    }

    body a {
      color: #000000;
      text-decoration: none;
    }

    p {
      margin: 0;
      padding: 0;
    }

    table.wrapper {
      width: 100% !important;
      table-layout: fixed;
      -webkit-font-smoothing: antialiased;
      -webkit-text-size-adjust: 100%;
      -moz-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }

    img.max-width {
      max-width: 100% !important;
    }

    .column.of-2 {
      width: 50%;
    }

    .column.of-3 {
      width: 33.333%;
    }

    .column.of-4 {
      width: 25%;
    }

    ul ul ul ul {
      list-style-type: disc !important;
    }

    ol ol {
      list-style-type: lower-roman !important;
    }

    ol ol ol {
      list-style-type: lower-latin !important;
    }

    ol ol ol ol {
      list-style-type: decimal !important;
    }

    @media screen and (max-width:480px) {

      .preheader .rightColumnContent,
      .footer .rightColumnContent {
        text-align: left !important;
      }

      .preheader .rightColumnContent div,
      .preheader .rightColumnContent span,
      .footer .rightColumnContent div,
      .footer .rightColumnContent span {
        text-align: left !important;
      }

      .preheader .rightColumnContent,
      .preheader .leftColumnContent {
        font-size: 80% !important;
        padding: 5px 0;
      }

      table.wrapper-mobile {
        width: 100% !important;
        table-layout: fixed;
      }

      img.max-width {
        height: auto !important;
        max-width: 100% !important;
      }

      a.bulletproof-button {
        display: block !important;
        width: auto !important;
        font-size: 80%;
        padding-left: 0 !important;
        padding-right: 0 !important;
      }

      .columns {
        width: 100% !important;
      }

      .column {
        display: block !important;
        width: 100% !important;
        padding-left: 0 !important;
        padding-right: 0 !important;
        margin-left: 0 !important;
        margin-right: 0 !important;
      }

      .social-icon-column {
        display: inline-block !important;
      }
    }
  </style>
  <link href="https://fonts.googleapis.com/css?family=Viga&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Viga', sans-serif;
    }
  </style>
</head>

<body>
  <center class="wrapper" data-link-color="#000000"
    data-body-style="font-size:14px; font-family:inherit; color:#000000; background-color:#FFFFFF;">
    <div class="webkit">
      <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#FFFFFF">
        <tr>
          <td valign="top" bgcolor="#FFFFFF" width="100%">
            <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0"
              border="0">
              <tr>
                <td width="100%">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td>

                        <table width="100%" cellpadding="0" cellspacing="0" border="0"
                          style="width:100%; max-width:600px;" align="center">
                          <tr>
                            <td role="modules-container"
                              style="padding:0px 0px 0px 0px; color:#000000; text-align:left;" bgcolor="#FFFFFF"
                              width="100%" align="left">
                              <table class="module preheader preheader-hide" role="module" data-type="preheader"
                                border="0" cellpadding="0" cellspacing="0" width="100%"
                                style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
                                <tr>
                                  <td role="module-content">
                                    <p>Confirm your email address to start managing your account.</p>
                                  </td>
                                </tr>
                              </table>
                              <table class="module" role="module" data-type="text" border="0" cellpadding="0"
                                cellspacing="0" width="100%" style="table-layout: fixed;"
                                data-muid="bff8ffa1-41a9-4aab-a2ea-52ac3767c6f4" data-mc-module-version="2019-10-22">
                                <tbody>
                                  <tr>
                                    <td
                                      style="padding:18px 30px 18px 30px; line-height:40px; text-align:inherit; background-color:#dde6de;"
                                      height="100%" valign="top" bgcolor="#dde6de" role="module-content">
                                      <div>
                                        <div style="font-family: inherit; text-align: center"><span
                                            style="color: #6fab81; font-size: 40px; font-family: inherit">Thank you for
                                            creating account on our site! Now what ?</span></div>
                                        <div></div>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table class="module" role="module" data-type="text" border="0" cellpadding="0"
                                cellspacing="0" width="100%" style="table-layout: fixed;"
                                data-muid="2f94ef24-a0d9-4e6f-be94-d2d1257946b0" data-mc-module-version="2019-10-22">
                                <tbody>
                                  <tr>
                                    <td
                                      style="padding:18px 50px 18px 50px; line-height:22px; text-align:inherit; background-color:#dde6de;"
                                      height="100%" valign="top" bgcolor="#dde6de" role="module-content">
                                      <div>
                                        <div style="font-family: inherit; text-align: center"><span
                                            style="font-size: 16px; font-family: inherit">Confirm your email address to
                                            start managing your account.</span></div>
                                        <div></div>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table class="module" role="module" data-type="text" border="0" cellpadding="0"
                                cellspacing="0" width="100%" style="table-layout: fixed;"
                                data-muid="2f94ef24-a0d9-4e6f-be94-d2d1257946b0.1">
                                <tbody>
                                  <tr>
                                    <td
                                      style="padding:18px 50px 18px 50px; line-height:22px; text-align:inherit; background-color:#dde6de;"
                                      height="100%" valign="top" bgcolor="#dde6de" role="module-content">
                                      <div>
                                        <div style="font-family: inherit; text-align: center">Your email verification
                                          code is &nbsp;&nbsp;&nbsp;&nbsp;<span
                                            style="font-size: 18px"><strong>${code}</strong></span></div>
                                        <div></div>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <div data-role="module-unsubscribe" class="module" role="module" data-type="unsubscribe"
                                style="color:#444444; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:Center;"
                                data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5">
                                <div class="Unsubscribe--addressLine"></div>
                                <p style="font-size:12px; line-height:20px;"><a target="_blank"
                                    class="Unsubscribe--unsubscribeLink zzzzzzz" href="{{{unsubscribe}}}"
                                    style="">Unsubscribe</a> - <a href="{{{unsubscribe_preferences}}}" target="_blank"
                                    class="Unsubscribe--unsubscribePreferences" style="">Unsubscribe Preferences</a></p>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  </center>
</body>

</html>`;
};
