class ProductExportFields:
    """Data structure with fields for product export."""

    PRODUCT_FIELDS = {
        "fields": {
            "id": "ds.Product.id",
            "name": "ds.Product.name",
            "description": "ds.Product.description",
            "category": "ds.Product.category.select(ds.Category.slug)",
            "product_type": "ds.Product.productType.select(ds.productType.name)",
            "charge_taxes": "ds.Product.chargeTaxes",
            "product_weight": "ds.Product.weight.select(ds.Weight.value)",
            "variant_sku": "ds.Product.defaultVariant.select(ds.ProductVariant.sku)",
            "variant_weight": "ds.Product.defaultVariant.select(ds.ProductVariant.weight.select(ds.Weight.value))",
        },
        "product_many_to_many": {
            "collections": "ds.Product.collections.select(ds.Collection.slug)",
            "product_media": "ds.Product.media.select(ds.ProductMedia.url)",
        },
        "variant_many_to_many": {
            "variant_media": "ds.Product.variants.select(ds.ProductVariant.media.select(ds.ProductMedia.url))"
        },
    }

    PRODUCT_ATTRIBUTE_FIELDS = {
        "value": "attributes__values__slug",
        "file_url": "attributes__values__file_url",
        "rich_text": "attributes__values__rich_text",
        "boolean": "attributes__values__boolean",
        "date_time": "attributes__values__date_time",
        "slug": "attributes__assignment__attribute__slug",
        "input_type": "attributes__assignment__attribute__input_type",
        "entity_type": "attributes__assignment__attribute__entity_type",
        "unit": "attributes__assignment__attribute__unit",
        "attribute_pk": "attributes__assignment__attribute__pk",
    }

    PRODUCT_CHANNEL_LISTING_FIELDS = {
        "channel_pk": "channel_listings__channel__pk",
        "slug": "channel_listings__channel__slug",
        "product_currency_code": "channel_listings__currency",
        "published": "channel_listings__is_published",
        "publication_date": "channel_listings__publication_date",
        "searchable": "channel_listings__visible_in_listings",
        "available for purchase": "channel_listings__available_for_purchase",
    }

    WAREHOUSE_FIELDS = {
        "slug": "variants__stocks__warehouse__slug",
        "quantity": "variants__stocks__quantity",
        "warehouse_pk": "variants__stocks__warehouse__id",
    }

    VARIANT_ATTRIBUTE_FIELDS = {
        "value": "variants__attributes__values__slug",
        "file_url": "variants__attributes__values__file_url",
        "rich_text": "variants__attributes__values__rich_text",
        "boolean": "variants__attributes__values__boolean",
        "date_time": "variants__attributes__values__date_time",
        "slug": "variants__attributes__assignment__attribute__slug",
        "input_type": "variants__attributes__assignment__attribute__input_type",
        "entity_type": "variants__attributes__assignment__attribute__entity_type",
        "unit": "variants__attributes__assignment__attribute__unit",
        "attribute_pk": "variants__attributes__assignment__attribute__pk",
    }

    VARIANT_CHANNEL_LISTING_FIELDS = {
        "channel_pk": "variants__channel_listings__channel__pk",
        "slug": "variants__channel_listings__channel__slug",
        "price_amount": "variants__channel_listings__price_amount",
        "variant_currency_code": "variants__channel_listings__currency",
        "variant_cost_price": "variants__channel_listings__cost_price_amount",
    }
