use ic_cdk::api::caller;
use ic_cdk_macros::*;
use std::collections::HashMap;
use std::cell::RefCell;
use candid::CandidType;
use serde::{Deserialize, Serialize};

#[derive(CandidType, Deserialize, Serialize, Clone)]
pub struct IPEntry {
    title: String,
    description: String,
    ip_type: String,
    metadata: String,
    image_url: Option<String>,
    additional_files: Vec<String>,
}

type IPStorage = HashMap<String, Vec<IPEntry>>;

thread_local! {
    static IP_DATABASE: RefCell<IPStorage> = RefCell::new(HashMap::new());
}

#[update]
fn register_ip(entry: IPEntry) -> String {
    let user = caller().to_text();
    IP_DATABASE.with(|db| {
        let mut map = db.borrow_mut();
        let list = map.entry(user.clone()).or_insert_with(Vec::new);
        list.push(entry);
    });

    format!("IP registered successfully for {}", user)
}

#[query]
fn get_my_ips() -> Vec<IPEntry> {
    let user = caller().to_text();
    IP_DATABASE.with(|db| {
        db.borrow().get(&user).cloned().unwrap_or_default()
    })
}
