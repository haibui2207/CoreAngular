using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CoreAngular.Models.AccountViewModels
{
    public class ConfirmEmailViewModel
    {
        public string userid { get; set; }
        public string code { get; set; }
    }
}
