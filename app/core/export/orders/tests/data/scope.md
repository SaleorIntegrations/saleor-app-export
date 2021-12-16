```json
{
  "operationName":"ProductExport",
  "variables": {
    "input":{
      "exportInfo": {
        "attributes":[],
        "channels":[],
        "fields":["CATEGORY","COLLECTIONS","PRODUCT_TYPE","DESCRIPTION","NAME","PRODUCT_MEDIA","VARIANT_MEDIA","PRODUCT_WEIGHT","VARIANT_SKU","VARIANT_WEIGHT","CHARGE_TAXES"],
        "warehouses":["V2FyZWhvdXNlOmIxZDA0YmY4LTdlN2YtNGYxMC1iYmEzLWM5OTRiMTZjZmU1Mw==","V2FyZWhvdXNlOjEzMTYxZDg3LWFlOTQtNDg0YS04NDEyLTRmZjYwNjhjNWY1NQ=="]},
        "fileType":"CSV",
        "scope":"ALL",
        "filter":{
          "attributes":null,
          "categories":null,
          "collections":null,
          "price":null,
          "productTypes":null,
          "stockAvailability":"IN_STOCK"
        },
      "ids":[]
    }
  },
  "query":"query"
}
```

```graphql
fragment ExportFileFragment on ExportFile {
  id
  status
  url
  __typename
}

fragment ExportErrorFragment on ExportError {
  code
  field
  __typename
}

mutation ProductExport($input: ExportProductsInput!) {
  exportProducts(input: $input) {
    exportFile {
      ...ExportFileFragment
      __typename
    }
    errors {
      ...ExportErrorFragment
      __typename
    }
    __typename
  }
}
```
