using Breeze.ContextProvider;
using Breeze.ContextProvider.EF6;
using Breeze.WebApi2;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace TimeAPI.Controllers
{
    [EnableCors(origins: "*",
    headers: "*",
    methods: "*",
    SupportsCredentials = true)]

    [BreezeController]

    [Authorize]

    public class TimeController : ApiController
    {
        readonly EFContextProvider<TimeEntities> _contextProvider =
    new EFContextProvider<TimeEntities>();

        // ~/breeze/todos/Metadata 
        [HttpGet]
        public string Metadata()
        {
            return _contextProvider.Metadata();
        }

        // ~/breeze/todos/Todos
        // ~/breeze/todos/Todos?$filter=IsArchived eq false&$orderby=CreatedAt 
        [HttpGet]
        public IQueryable<Timesheet> Timesheet()
        {
            return _contextProvider.Context.Timesheet;
        }
        [HttpGet]
        public IQueryable<Timerow> Timerow()
        {
            return _contextProvider.Context.Timerow;
        }
        [HttpGet]
        public IQueryable<Project> Project()
        {
            return _contextProvider.Context.Project;
        }

        // ~/breeze/todos/SaveChanges
        [HttpPost]
        public SaveResult SaveChanges(JObject saveBundle)
        {
            return _contextProvider.SaveChanges(saveBundle);
        }
    }
}