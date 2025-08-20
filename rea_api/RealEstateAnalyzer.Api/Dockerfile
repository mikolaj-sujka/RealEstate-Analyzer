# See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

# This stage is used when running from VS in fast mode (Default for Debug configuration)
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081


# This stage is used to build the service project
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["RealEstateAnalyzer.Api/RealEstateAnalyzer.Api.csproj", "RealEstateAnalyzer.Api/"]
COPY ["RealEstateAnalyzer.Application/RealEstateAnalyzer.Application.csproj", "RealEstateAnalyzer.Application/"]
COPY ["RealEstateAnalyzer.Infrastructure.Redis/RealEstateAnalyzer.Infrastructure.Redis.csproj", "RealEstateAnalyzer.Infrastructure.Redis/"]
COPY ["RealEstateAnalyzer.Infrastructure/RealEstateAnalyzer.Infrastructure.csproj", "RealEstateAnalyzer.Infrastructure/"]
COPY ["RealEstateAnalyzer.Domain/RealEstateAnalyzer.Domain.csproj", "RealEstateAnalyzer.Domain/"]
COPY ["RealEstateAnalyzer.Shared/RealEstateAnalyzer.Infrastructure.Hangfire.csproj", "RealEstateAnalyzer.Infrastructure.Hangfire/"]
COPY ["RealEstateAnalyzer.Shared/RealEstateAnalyzer.Infrastructure.Http.csproj", "RealEstateAnalyzer.Infrastructure.Http/"]
COPY ["RealEstateAnalyzer.Shared/RealEstateAnalyzer.WebScraping.csproj", "RealEstateAnalyzer.WebScraping/"]
COPY ["RealEstateAnalyzer.Shared/RealEstateAnalyzer.WebScraping.Domain.csproj", "RealEstateAnalyzer.WebScraping.Domain/"]
COPY ["RealEstateAnalyzer.Shared/RealEstateAnalyzer.WebScraping.Abstractions.csproj", "RealEstateAnalyzer.WebScraping.Abstractions/"]
RUN dotnet restore "./RealEstateAnalyzer.Api/RealEstateAnalyzer.Api.csproj"
COPY . .
WORKDIR "/src/RealEstateAnalyzer.Api"
RUN dotnet build "./RealEstateAnalyzer.Api.csproj" -c $BUILD_CONFIGURATION -o /app/build

# This stage is used to publish the service project to be copied to the final stage
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./RealEstateAnalyzer.Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# This stage is used in production or when running from VS in regular mode (Default when not using the Debug configuration)
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "RealEstateAnalyzer.Api.dll"]