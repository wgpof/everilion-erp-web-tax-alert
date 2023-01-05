<%@ Page Language="C#"
    MasterPageFile="~/ShareMaster/ShareList.Master"
    AutoEventWireup="true"
    CodeBehind="TaxtAlertReport.aspx.cs"
    Inherits="everilion_erp_web_tax_alert.TaxAlert.Report.TaxtAlertReport" %>

<%@ MasterType VirtualPath="~/ShareMaster/ShareList.Master" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="cc1" %>

<asp:Content ID="Content1" ContentPlaceHolderID="wfInterface" runat="server">
    <script language="javascript" type="text/javascript">
        function onClientShown(sender, e) { sender._height = 250; }
    </script>

    <asp:UpdatePanel ID="UPViewFiltros" runat="server" UpdateMode="Always">
        <ContentTemplate>
            <asp:UpdateProgress ID="UpdateProgress1" style="position: fixed; top: 40%; left: 45%; z-index: 10;" runat="server">
                <ProgressTemplate>
                    <div id="Background"></div>
                    <div id="Progress">
                        <asp:Image runat="server" ID="timerImage" ImageUrl="/lib/estilos/hubble/images/GenerarInforme.gif" />
                        <br />
                    </div>
                    <div id="Message">
                        <asp:Label runat="server" ID="WaitPlease" Font-Bold="true" Text=""><%=this.Literals["LITWAITINGFOR"]%></asp:Label>
                    </div>
                </ProgressTemplate>
            </asp:UpdateProgress>
            <div class="Section">
                <a href="#" rel="toggle[SectionFiltros]" data-openimage="<%=Resources.ico2.CollapseSections %>" data-closedimage="">
                    <div class="SectionHeader">
                        <%=this.Literals["LITFILTROS"]%>
                    </div>
                </a>
                <asp:Panel ID="SectionPanelFiltros" runat="server">
                    <div class="row">

                        <div class="col-sm-6 col-md-6 col-lg-3 date">
                            <asp:Label ID="lblFromDate" CssClass="label txtMandatory" runat="server"><%=this.Literals["LITFECHADESDE"]%>:</asp:Label>
                            <asp:TextBox ID="txtFromDate" CssClass="CELDA, enter-disabled input-btn" runat="server" EnableViewState="true" title="DD/MM/AAAA" AutoPostBack="true" MaxLength="10" onkeydown="return (event.keyCode!=13);"
                                OnTextChanged="TxtFromDate_TextChanged"></asp:TextBox>
                            <asp:ImageButton runat="server" ID="imgBtnFromDate" Width="50%" ImageUrl="/lib/estilos/hubble/images/calendario.png" />
                            <cc1:CalendarExtender ID="ceFromDate" Format="dd/MM/yyyy" TargetControlID="txtFromDate" PopupButtonID="imgBtnFromDate" runat="server" Enabled="True" OnClientShown="onClientShown"></cc1:CalendarExtender>
                        </div>
                        <div class="col-sm-6 col-md-6 col-lg-2 date">
                            <asp:Label ID="lblToDate" CssClass="label txtMandatory" runat="server" Text=""><%=this.Literals["LITFECHAHASTA"]%>:</asp:Label>
                            <asp:TextBox ID="txtToDate" CssClass="CELDA, enter-disabled input-btn" runat="server" EnableViewState="true" title="DD/MM/AAAA" AutoPostBack="true" MaxLength="10" onkeydown="return (event.keyCode!=13);" OnTextChanged="TxtToDate_TextChanged"></asp:TextBox>
                            <asp:ImageButton runat="server" ID="imgBtnToDate" Width="100%" ImageUrl="/lib/estilos/hubble/images/calendario.png" />
                            <cc1:CalendarExtender ID="ceToDate" Format="dd/MM/yyyy" TargetControlID="txtToDate" PopupButtonID="imgBtnToDate" runat="server" Enabled="True" OnClientShown="onClientShown"></cc1:CalendarExtender>
                        </div>

                        <div class="col-sm-3 col-md-3 col-lg-3"></div>

                        <div class="col-sm-2 col-md-2 col-lg-2"></div>
                        <div class="col-sm-3 col-md-3 col-lg-3">
                            <asp:Label ID="lblStore" CssClass="label" runat="server"><%=this.Literals["LITTIENDA"]%>:</asp:Label>
                            <asp:ListBox ID="ddlStore" AutoPostBack="True" class="input-max" runat="server" OnSelectedIndexChanged="DdlStore_SelectedIndexChanged" Width="100%" SelectionMode="Multiple" Rows="6"></asp:ListBox>
                        </div>
                        <div class="col-sm-3 col-md-3 col-lg-3">
                            <asp:Label ID="lblSerie" CssClass="label" runat="server"><%=this.Literals["LITSERIE"]%>:</asp:Label>
                            <asp:ListBox ID="ddlSerie" class="input-max" runat="server" Width="100%" SelectionMode="Multiple" Rows="6"></asp:ListBox>
                        </div>
                    </div>
                </asp:Panel>

                <asp:Panel ID="pReporte" meta:resourcekey="PInformeResource1" Visible="false" Height="700px" runat="server">
                </asp:Panel>
            </div>
        </ContentTemplate>
    </asp:UpdatePanel>
</asp:Content>
