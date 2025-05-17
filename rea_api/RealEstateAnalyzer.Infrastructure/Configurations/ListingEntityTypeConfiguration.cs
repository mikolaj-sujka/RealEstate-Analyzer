using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealEstateAnalyzer.Domain.Entities;

namespace RealEstateAnalyzer.Infrastructure.Configurations;

public class ListingEntityTypeConfiguration : IEntityTypeConfiguration<Listing>
{
    public void Configure(EntityTypeBuilder<Listing> builder)
    {
        throw new NotImplementedException();
    }
}