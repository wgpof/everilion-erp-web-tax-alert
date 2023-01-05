using System.Web;
using System;

namespace everilion_erp_web_tax_alert.Classes
{
    public static class InterfazExtensions
    {
        public static void EXTConfigureSessionInLocalhost(this InterfazPaginas.Interfaz argPage)
        {
            try
            {
                if (HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"] == "127.0.0.1" || HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"] == "::1")
                {
                    argPage.Session["folder"] = "hubble";
                    argPage.Session["ncliente"] = "04796"; // PRE
                    argPage.Session["dsn_cliente"] = @"Data Source=artemisa-vpn,1433;Initial Catalog=ilion_egesticetTerra;User Id=entrada;Password=entrada;";
                    //argPage.Session["dsn_cliente"] = @"Data Source=harmonia-vpn,1433;Initial Catalog=ilion_egesticet;User Id=entrada;Password=preentrada2009;";//PRE
                    //argPage.Session["dsn_cliente"] = @"Data Source=ARTEMISA-vpn;Initial Catalog=ilion_admin;Integrated Security=True";
                    argPage.Session["usuario"] = "lmunodo";
                    argPage.Session["locale_user"] = "es-ES";
                    argPage.Session["locale"] = "es-ES";
                    argPage.Session["p"] = "5407";
                    argPage.Session["r"] = "4545";
                }
            }
            catch (Exception ex)
            {
                throw new Exception("FALLO EN EXTConfigureSessionInLocalhost", ex);
            }
        }

        public static void EXTConfigureMasterDelegates(this InterfazPaginas.Interfaz argPage, Action<object, EventArgs> argAddEvent, Action<object, EventArgs> argCancelEvent, Action<object, EventArgs> argSaveEvent, Action<object, EventArgs> argDeleteEvent, Action<object, EventArgs> argEditEvent, Action<object, EventArgs> argPrintEvent)
        {
            if (argAddEvent != null)
            {
                ((ShareMasterPage.Share)argPage.Master).AddEvent += new ShareMasterPage.ToolBarDelegate(argAddEvent);
            }

            if (argCancelEvent != null)
            {
                ((ShareMasterPage.Share)argPage.Master).CancelEvent += new ShareMasterPage.ToolBarDelegate(argCancelEvent);
            }

            if (argSaveEvent != null)
            {
                ((ShareMasterPage.Share)argPage.Master).SaveEvent += new ShareMasterPage.ToolBarDelegate(argSaveEvent);
            }

            if (argDeleteEvent != null)
            {
                ((ShareMasterPage.Share)argPage.Master).DeleteEvent += new ShareMasterPage.ToolBarDelegate(argDeleteEvent);
            }

            if (argEditEvent != null)
            {
                ((ShareMasterPage.Share)argPage.Master).EditEvent += new ShareMasterPage.ToolBarDelegate(argEditEvent);
            }

            if (argPrintEvent != null)
            {
                ((ShareMasterPage.Share)argPage.Master).PrintEvent += new ShareMasterPage.ToolBarDelegate(argPrintEvent);
            }
        }
    }
}