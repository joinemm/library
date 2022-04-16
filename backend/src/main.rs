use crate::routes::*;
use actix_web::middleware::Logger;
use actix_web::{dev::Server, web, App, HttpServer};
use env_logger::Env;
use sqlx::PgPool;
use std::net::TcpListener;

pub mod routes;

#[tokio::main]
async fn main() -> std::io::Result<()> {
    env_logger::Builder::from_env(Env::default().default_filter_or("info")).init();
    let configuration = source_configuration().expect("Failed to read configuration");
    let connection = PgPool::connect(&configuration.database.as_connection_string())
        .await
        .expect("Failed to connect to database");
    let address = format!(
        "{}:{}",
        configuration.application_ip, configuration.application_port
    );
    let listener = TcpListener::bind(address)?;
    run(listener, connection)?.await
}

pub fn run(listener: TcpListener, connection: PgPool) -> std::io::Result<Server> {
    let connection_arc = web::Data::new(connection);
    let server = HttpServer::new(move || {
        App::new()
            .wrap(Logger::default())
            .service(ping)
            .service(book_list)
            .service(book_add)
            .service(book_delete)
            .app_data(connection_arc.clone())
    })
    .listen(listener)?
    .run();

    Ok(server)
}

#[derive(serde::Deserialize)]
pub struct Settings {
    pub database: DatabaseSettings,
    pub application_port: u16,
    pub application_ip: String,
}
#[derive(serde::Deserialize)]
pub struct DatabaseSettings {
    pub database_engine: String,
    pub host: String,
    pub port: u16,
    pub username: String,
    pub password: String,
    pub database_name: String,
}

impl DatabaseSettings {
    pub fn as_connection_string(&self) -> String {
        format!(
            "{}://{}:{}@{}:{}/{}",
            self.database_engine,
            self.username,
            self.password,
            self.host,
            self.port,
            self.database_name
        )
    }
}

pub fn source_configuration() -> Result<Settings, config::ConfigError> {
    let mut settings = config::Config::default();
    settings.merge(config::File::with_name("configuration"))?;
    settings.try_into()
}
