<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="CreateAccount.aspx.cs" Inherits="LightSwitchApplication.CreateAccount" %>


<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    
    <form id="form1" runat="server">
    <div>
    <asp:createuserwizard runat="server" ContinueDestinationPageUrl='/'> <WizardSteps> <asp:CreateUserWizardStep runat="server"/> <asp:CompleteWizardStep runat="server" /> </WizardSteps> </asp:createuserwizard>
    </div>
    </form>
</body>
</html>
