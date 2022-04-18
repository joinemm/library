use crate::routes::*;
use actix_web::middleware::Logger;
use actix_web::{dev::Server, web, App, HttpServer};
use env_logger::Env;
use envconfig::Envconfig;
use sqlx::PgPool;
use std::net::TcpListener;

pub mod routes;

#[derive(Envconfig)]
pub struct Config {
    #[envconfig(from = "APP_PORT", default = "8080")]
    pub application_port: u16,

    #[envconfig(from = "APP_ADDRESS", default = "0.0.0.0")]
    pub application_ip: String,

    #[envconfig(from = "DB_HOST", default = "localhost")]
    pub db_host: String,

    #[envconfig(from = "DB_PORT", default = "5432")]
    pub db_port: u16,

    #[envconfig(from = "POSTGRES_USER", default = "library")]
    pub db_username: String,

    #[envconfig(from = "POSTGRES_PASSWORD", default = "library")]
    pub db_password: String,

    #[envconfig(from = "POSTGRES_DB", default = "library")]
    pub db_name: String,
}

impl Config {
    pub fn connection_string(&self) -> String {
        format!(
            "postgresql://{}:{}@{}:{}/{}",
            self.db_username, self.db_password, self.db_host, self.db_port, self.db_name
        )
    }
}

#[tokio::main]
async fn main() -> std::io::Result<()> {
    env_logger::Builder::from_env(Env::default().default_filter_or("info")).init();
    let configuration = Config::init_from_env().unwrap();
    let connection = PgPool::connect(&configuration.connection_string())
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
            .service(book_edit)
            .service(book_delete)
            .app_data(connection_arc.clone())
    })
    .listen(listener)?
    .run();

    Ok(server)
}
