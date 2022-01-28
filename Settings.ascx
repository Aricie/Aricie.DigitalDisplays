<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Settings.ascx.cs" Inherits="Aricie.DigitalDisplays.Settings" %>
<%@ Register TagPrefix="aricie" Namespace="Aricie.DNN.UI.WebControls" Assembly="Aricie.DNN" %>

<aricie:AriciePropertyEditorControl runat="server" ID="pEditor" EditControlStyle-CssClass="NormalTextBox" EnableViewstate="True" 
        EnableClientValidation="true" ErrorStyle-CssClass="NormalRed" GroupHeaderStyle-CssClass="Head"
        GroupHeaderIncludeRule="true" LabelStyle-CssClass="SubHead" VisibilityStyle-CssClass="Normal"
        GroupByMode="Section" DisplayMode="Div" LabelMode="Top" LoadAllAccordions="false"  IncludeFontAwesome="false"
        EditorStyle="Legacy" />
