using Everilion.BD.Generic.Common;
using everilion_erp_net_tax_alert_report.BC;
using everilion_erp_net_tax_alert_report.Service;
using everilion_erp_web_tax_alert.Classes;
using Herramientas;
using Idiomas.BC;
using Interfaz;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Configuration;
using System.Globalization;
using System.Linq;
using System.Resources;
using System.Web;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;

namespace everilion_erp_web_tax_alert.TaxAlert.Report
{
    public partial class TaxtAlertReport : InterfazPaginas.Interfaz
    {
        #region Variables

        private const String item = "v44";
        protected Hashtable Literals;
        protected bool esLocal;

        #endregion

        #region Metodos
        protected void Page_Load(object sender, EventArgs e)
        {
            this.EXTConfigureSessionInLocalhost();
            CreateMasterDelegates();

            string locale = "es-ES";
            AssignLiterals(item, locale);
            LoadPainHead();
            if (!IsPostBack)
            {
                LoadStyle();
                LoadData();
            }
        }
        private void CreateMasterDelegates()
        {
            Master.LoadEvent += new ShareMasterPage.ToolBarDelegate3(BtnLoad_Click);
            Master.ReturnEvent += new ShareMasterPage.ToolBarDelegate3(BtnReturn_Click);
            Master.CancelEvent += new ShareMasterPage.ToolBarDelegate3(BtnCancel_Click);
            this.Master.FindControl("ibReturn").Visible = false;
        }
        private void LoadPainHead()
        {
            if (HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"] == "127.0.0.1" || HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"] == "::1")
            {
                esLocal = true;
                Master.PaintHead("");
            }
            else
            {
                Master.PaintHead("TaxAlertReport.aspx");
            }
        }
        private void AssignLiterals(string item, string locale)
        {
            if (String.IsNullOrEmpty(locale))
            {
                locale = "es-ES";
            }
            string lanPathV = ConfigurationManager.AppSettings["LanFolder"].ToString();

            var LiteralsPath = Server.MapPath("/") + lanPathV;
            ResourceManager myManager = IdiomasBC.LoadLiterals(LiteralsPath, item, locale);

            if (myManager != null)
            {
                Literals = new Hashtable
                {
                        { "LITFILTROS", myManager.GetString("LITFILTROS") },
                        { "LITFECHADESDE", myManager.GetString("LITFECHADESDE") },
                        { "LITFECHAHASTA", myManager.GetString("LITFECHAHASTA") },
                        { "LITTIENDA", myManager.GetString("LITTIENDA") },
                        { "LITSERIE", myManager.GetString("LITSERIE") },
                        { "LITMENSCHECKVACIOS", myManager.GetString("LITMENSCHECKVACIOS") },
                        { "LITFORMATERROR", myManager.GetString("LITFORMATERROR") },
                        { "LITMAXDATETIME", myManager.GetString("LITMAXDATETIME") },
                        { "LITFECHAFINMENORINI", myManager.GetString("LITFECHAFINMENORINI") },
                        { "LITTODOS", myManager.GetString("LITTODOS") },
                        { "LITERRORCARGAREPORTE", myManager.GetString("LITERRORCARGAREPORTE") },
                        { "LITFILTROSOBLIGATORIOS", myManager.GetString("LITFILTROSOBLIGATORIOS") },
                        { "LITWAITINGFOR", myManager.GetString("LITWAITINGFOR") },
                        { "LITNOSITESBYUSER", myManager.GetString("LITNOSITESBYUSER") }
                    };
            }
        }
        private void LoadStyle()
        {
            if (Session["folder"] == null)
                Session["folder"] = "hubble";

            Master.AssignStylesToPage(StylesIlion.InterfaceTypes.type03);

            string styleHead = "<link href=\"" + "/lib/estilos/" + Session["folder"].ToString() + "/Calendar.css\" rel=\"stylesheet\" type=\"text/css\" />";
            styleHead += "<link href=\"" + "/lib/estilos/" + Session["folder"].ToString() + "/formularios.css\" rel=\"stylesheet\" type=\"text/css\" />";
            styleHead += "<link href=\"" + "/lib/estilos/" + Session["folder"].ToString() + "/GridView.css\" rel=\"stylesheet\" type=\"text/css\" />";
            styleHead += "<link href=\"" + "/lib/estilos/" + Session["folder"].ToString() + "/Sections.css\" rel=\"stylesheet\" type=\"text/css\" />";
            styleHead += "<link href=\"" + "/lib/estilos/" + Session["folder"].ToString() + "/dropdown.css\" rel=\"stylesheet\" type=\"text/css\" />";
            styleHead += "<link href=\"" + "/lib/estilos/" + Session["folder"].ToString() + "/breadcrumb.css\" rel=\"stylesheet\" type=\"text/css\" />";
            styleHead += "<link href=\"" + "/lib/estilos/" + Session["folder"].ToString() + "/generalData.css\" rel=\"stylesheet\" type=\"text/css\" />";

            Master.AssignStylesToPage(styleHead);
        }
        protected void TxtFromDate_TextChanged(object sender, EventArgs e)
        {
            string messageFromDate = string.Empty;
            if (!ValidateDateTime(ref messageFromDate))
            {
                ASPNETJSUtils.JSUtils.Show(messageFromDate);
            }
        }
        protected void TxtToDate_TextChanged(object sender, EventArgs e)
        {
            string messageToDate = string.Empty;
            if (!ValidateDateTime(ref messageToDate))
            {
                ASPNETJSUtils.JSUtils.Show(messageToDate);
            }

            DateTime dt = Convert.ToDateTime(txtToDate.Text.ToString()).AddMonths(-1);
            txtFromDate.Text = dt.ToString("dd/MM/yyyy");
            ceFromDate.StartDate = dt;
            ceFromDate.EndDate = Convert.ToDateTime(txtToDate.Text.ToString()).AddDays(-1);

        }
        private bool IsDateControl(TextBox textBox, string format = "dd/MM/yyyy")
        {
            bool response = true;
            try
            {
                textBox.BorderColor = System.Drawing.Color.White;
                if (!string.IsNullOrWhiteSpace(textBox.Text))
                {
                    if (!DateTime.TryParseExact(textBox.Text, format, CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime dateTime))
                    {
                        textBox.BorderColor = System.Drawing.Color.Salmon;
                        response = false;
                    }
                }
                else
                {
                    textBox.BorderColor = System.Drawing.Color.Salmon;
                    response = false;
                }
            }
            catch (Exception)
            {
                response = false;
            }
            return response;
        }
        private bool ValidateDateTime(ref string message)
        {
            bool response = false;
            message = string.Empty;
            DateTime dateTimeEnteredFrom;
            DateTime dateTimeEnteredTo;

            if (IsEmptyControl(txtFromDate) || IsEmptyControl(txtToDate))
            {
                message = Literals["LITMENSCHECKVACIOS"].ToString();
            }
            else if (!IsDateControl(txtFromDate) || !IsDateControl(txtToDate))
            {
                message = Literals["LITFORMATERROR"].ToString();
            }
            else
            {
                dateTimeEnteredFrom = DateTime.Parse(txtFromDate.Text);
                dateTimeEnteredTo = DateTime.Parse(txtToDate.Text);

                if (dateTimeEnteredFrom > DateTime.Now || dateTimeEnteredTo > DateTime.Now)
                {
                    message = Literals["LITMAXDATETIME"].ToString();
                }
                else if (DateTime.Parse(txtFromDate.Text) > DateTime.Parse(txtToDate.Text))
                {
                    message = Literals["LITFECHAFINMENORINI"].ToString();
                }
                else
                {
                    response = true;
                }
            }
            if (!response) LoadDateTime();
            return response;
        }
        private bool IsEmptyControl(TextBox textBox)
        {
            bool response = false;
            try
            {
                textBox.BorderColor = System.Drawing.Color.Empty;
                if (string.IsNullOrWhiteSpace(textBox.Text))
                {
                    textBox.BorderColor = System.Drawing.Color.Salmon;
                    response = true;
                }
            }
            catch (Exception)
            {
                response = true;
            }
            return response;
        }
        private void LoadData()
        {
            LoadDateTime();
            LoadDropDownListStore();
            LoadDropDownListSerie();
        }
        private void LoadDateTime()
        {
            DateTime dateTime = DateTime.Now;
            var startDate = dateTime.AddDays(-1);
            var endDate = startDate.AddMonths(-1);

            txtFromDate.Text = endDate.ToString("dd/MM/yyyy");
            txtToDate.Text = startDate.ToString("dd/MM/yyyy");

            DateTime dt = Convert.ToDateTime(txtToDate.Text.ToString()).AddMonths(-1);
            txtFromDate.Text = dt.ToString("dd/MM/yyyy");
            ceFromDate.StartDate = dt;
            ceFromDate.EndDate = Convert.ToDateTime(txtToDate.Text.ToString()).AddDays(-1);
            ceToDate.EndDate = startDate;
        }
        private void LoadDropDownListStore()
        {
            ddlStore.Items.Clear();
            Everilion.BD.Store.BC.StoreBC storeBC = new Everilion.BD.Store.BC.StoreBC();
            // All company sites (without segmentation)
            IList<Everilion.BD.Store.BE.Store> allStores = storeBC.GetAllStores(Session["dsn_cliente"].ToString(), Session["ncliente"].ToString(), Session["usuario"].ToString());
            // Segmentation

            if (HttpContext.Current.Session["p"] != null && HttpContext.Current.Session["r"] != null)
            {
                everilion_erp_net_tax_alert_report.Model.ContextInfo contextInfo = new everilion_erp_net_tax_alert_report.Model.ContextInfo
                {
                    User = Session["usuario"].ToString(),
                    NCompany = Session["ncliente"].ToString(),
                    StrDsn = Session["dsn_cliente"].ToString(),
                    MenuItemId = item,
                    ProfileId = HttpContext.Current.Session["p"].ToString(),
                    RolId = HttpContext.Current.Session["r"].ToString(),
                    SessionId = HttpContext.Current.Session.SessionID
                };

                Dictionary<string, string> response = Config.GetUserParamsRP(contextInfo.NCompany, contextInfo.User, contextInfo.MenuItemId, int.Parse(contextInfo.RolId), int.Parse(contextInfo.ProfileId));
                if (response == null || !response.ContainsKey("fst") || response["fst"] == "True")
                {
                    // Segmentation enabled
                    IStoreUserService storeUserService = everilion_erp_net_tax_alert_report.Service.ServiceFactory.CreateInstance<IStoreUserService>();
                    // User sites (only code)
                    List<everilion_erp_net_tax_alert_report.Model.Store> allowedStores = storeUserService.GetStores(contextInfo, Session["usuario"].ToString()).ToList();

                    allStores = allStores.Where(store => allowedStores.Any(aStore => aStore.Code.Equals(store.Code))).ToList();
                }
            }

            ddlStore.Items.Insert(0, new ListItem(Literals["LITTODOS"].ToString(), ConstantCommon.All));

            if (allStores == null || allStores.Count == 0 || !allStores.Any())
            {
                ASPNETJSUtils.JSUtils.Show(this.Literals["LITNOSITESBYUSER"] as string);
            }
            else
            {
                int cont = 1;

                foreach (var items in allStores)
                {
                    ddlStore.Items.Insert(cont, new ListItem(items.Description, items.Code));
                    cont++;
                }
            }

            ddlStore.SelectedIndex = 0;
        }

        private void LoadDropDownListSerie()
        {
            string store = (ddlStore.SelectedValue == "ALL") ? string.Join(";", ddlStore.Items.Cast<ListItem>().Where(x => x.Value != "ALL").Select(x => x.Value).ToArray()) : string.Join(";", ddlStore.Items.Cast<ListItem>().Where(x => x.Selected && x.Value != "ALL").Select(x => x.Value).ToArray());
            SeriesBC serieBC = new SeriesBC();

            ddlSerie.Items.Clear();
            ddlSerie.Items.Add(new ListItem(Literals["LITTODOS"].ToString(), "ALL"));

            var series = serieBC.GetAllSeries(store, Session["dsn_cliente"] as string, Session["ncliente"] as string, Session["usuario"] as string);
            foreach (var items in series)
            {
                ddlSerie.Items.Add(new ListItem(items.Descripcion, items.Codigo));
            }

            ddlSerie.SelectedIndex = 0;
        }

        protected void DdlStore_SelectedIndexChanged(object sender, EventArgs e)
        {
            LoadDropDownListSerie();
        }

        #endregion

        #region Eventos

        protected void BtnLoad_Click(object sender, EventArgs e)
        {
            if (!string.IsNullOrEmpty(txtFromDate.Text) && !string.IsNullOrEmpty(txtToDate.Text) && (ddlStore.SelectedValue == "ALL") && (ddlSerie.SelectedValue == "ALL"))
            {
                try
                {
                    this.Master.FindControl("ibLoad").Visible = false;
                    this.Master.FindControl("ibReturn").Visible = true;
                    this.Master.FindControl("ibCancel").Visible = false;
                    this.SectionPanelFiltros.Visible = false;
                    this.pReporte.Visible = true;

                    string fromDate = (!string.IsNullOrEmpty(txtFromDate.Text)) ? Convert.ToDateTime(txtFromDate.Text).ToString("dd/MM/yyyy") : string.Empty;
                    string toDate = (!string.IsNullOrEmpty(txtToDate.Text)) ? Convert.ToDateTime(txtToDate.Text).ToString("dd/MM/yyyy") : string.Empty;
                    string store = (ddlStore.SelectedValue == "ALL") ? string.Join(";", ddlStore.Items.Cast<ListItem>().Where(x => x.Value != "ALL").Select(x => x.Value).ToArray()) : string.Join(";", ddlStore.Items.Cast<ListItem>().Where(x => x.Selected && x.Value != "ALL").Select(x => x.Value).ToArray());
                    string serie = (ddlSerie.SelectedValue == "ALL") ? string.Join(";", ddlSerie.Items.Cast<ListItem>().Where(x => x.Value != "ALL").Select(x => x.Value).ToArray()) : string.Join(";", ddlSerie.Items.Cast<ListItem>().Where(x => x.Selected && x.Value != "ALL").Select(x => x.Value).ToArray());


                    string urlReport = string.Empty;
                    string urlReportBase = string.Empty;
                    urlReportBase = Metodos.generateUrl();
                    string reportName = "ReportTaxAlert";

                    String nameReportFolder = "ERP";
                    string _ReportingsInstancePath = ConfigurationManager.AppSettings["ReportingsInstancePath"];

                    if (!string.IsNullOrEmpty(_ReportingsInstancePath))
                    {
                        urlReportBase += ConfigurationManager.AppSettings["URLSERVINF"] + "?/" + _ReportingsInstancePath + nameReportFolder + "/" + reportName;
                    }
                    else
                    {
                        urlReportBase += ConfigurationManager.AppSettings["URLSERVINF"] + "?/" + nameReportFolder + "/" + reportName;
                    }

                    urlReport += "&ne=" + Session["ncliente"].ToString();
                    urlReport += "&us=" + this.Session["usuario"].ToString();
                    urlReport += "&bd=";
                    urlReport += "&id=" + Metodos.d_lookup("sesionid", "indice", "entrada = '" + this.Session["usuario"].ToString() + "'", ConfigurationManager.ConnectionStrings["Principal.ilionDSN"].ConnectionString);
                    urlReport += "&cr=" + Session["locale_user"].ToString();
                    urlReport += "&datefrom=" + HttpUtility.UrlEncode(fromDate);
                    urlReport += "&dateto=" + HttpUtility.UrlEncode(toDate);
                    urlReport += "&st=" + HttpUtility.UrlEncode(store);
                    urlReport += "&se=" + HttpUtility.UrlEncode(serie);


                    HtmlIframe iframe = new HtmlIframe
                    {
                        ID = "ifReporte",
                        ClientIDMode = ClientIDMode.Static
                    };

                    iframe.Style.Add("width", "100%");
                    iframe.Style.Add("height", "100%");
                    iframe.Attributes.Add("frameborder", "0");
                    iframe.Attributes.Add("scrolling", "no");
                    iframe.Src = urlReportBase + urlReport;
                    iframe.Attributes.Add("onload", "resizeReport('PageFooter', '" + iframe.ID + "');");
                    this.pReporte.Controls.Add(iframe);
                }
                catch (Exception)
                {
                    ASPNETJSUtils.JSUtils.Show(Literals["LITERRORCARGAREPORTE"].ToString());
                }
            }
            else
            {
                ASPNETJSUtils.JSUtils.Show(Literals["LITFILTROSOBLIGATORIOS"].ToString());
            }
        }
        protected void BtnReturn_Click(object sender, EventArgs e)
        {
            ((Controles.ButtonIlion)Master.FindControl("ibLoad")).Visible = true;
            ((Controles.ButtonIlion)Master.FindControl("ibCancel")).Visible = true;
            ((Controles.ButtonIlion)Master.FindControl("ibReturn")).Visible = false;
            SectionPanelFiltros.Visible = true;
            pReporte.Visible = false;
        }
        protected void BtnCancel_Click(object sender, EventArgs e)
        {
            this.Master.FindControl("ibLoad").Visible = true;
            this.Master.FindControl("ibReturn").Visible = false;

            txtFromDate.Text = string.Empty;
            txtToDate.Text = string.Empty;


            LoadData();
        }

        #endregion
    }
}