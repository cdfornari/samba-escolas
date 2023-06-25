import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EscolasModule } from './escolas/escolas.module';
import { CommonModule } from './common/common.module';
import { LugaresModule } from './lugares/lugares.module';
import { IntegrantesModule } from './integrantes/integrantes.module';
import { RolesModule } from './roles/roles.module';
import { PremiosModule } from './premios/premios.module';
import { HabilidadesModule } from './habilidades/habilidades.module';
import { ColoresModule } from './colores/colores.module';
import { JuridicosModule } from './patroc_juridicos/juridico.module';
import { NaturalesModule } from './patroc_naturales/naturales.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    CommonModule,
    EscolasModule,
    LugaresModule,
    IntegrantesModule,
    RolesModule,
    PremiosModule,
    HabilidadesModule,
    ColoresModule,
    JuridicosModule,
    NaturalesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
