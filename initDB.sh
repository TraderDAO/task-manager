#!/usr/bin/env bash

PGOPTIONS="--search_path=tradingplatform"
export PGOPTIONS

psql -d traderDao -c "DROP TABLE IF EXISTS tradingplatform.jobs;"
psql -d traderDao -c "create schema IF NOT EXISTS tradingplatform;"
psql -d traderDao -c "create TABLE tradingplatform.jobs(
    id SERIAL PRIMARY KEY,
    task TEXT,
    type TEXT,
    input_json TEXT,
    priority TEXT,
    done BOOLEAN,
    updated BIGINT,
    key_id BIGINT,
    account_id BIGINT,
    portfolio_id BIGINT,
    exchange_id BIGINT
);"
