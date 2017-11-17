using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace ReactCRUDScratch.Models
{
    public class ReactCRUDModels:DbContext

    {
        public ReactCRUDModels(DbContextOptions<ReactCRUDModels> options): base(options) { }

        public DbSet<Users> Users { get; set; }
    }
}
