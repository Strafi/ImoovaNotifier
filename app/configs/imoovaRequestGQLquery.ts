export const imoovaRequestGQLquery = `query RelocationList($first: Int!, $page: Int, $search: String, $region: Region, $supplier_id: ID, $departure_city_id: ID, $delivery_city_id: ID, $status: [RelocationStatus!], $orderBy: [QueryRelocationsOrderByRelationOrderByClause!], $scoutOrderBy: [QueryRelocationsScoutOrderByOrderByClause!], $where: QueryRelocationsWhereWhereConditions, $whereVehicle: QueryRelocationsWhereVehicleWhereHasConditions, $whereDepartureCity: QueryRelocationsWhereDepartureCityWhereHasConditions, $hasFuel: Boolean, $hasFerry: Boolean, $defaultOrder: Boolean) {
  relocations(
    first: $first
    page: $page
    search: $search
    supplier_id: $supplier_id
    region: $region
    departure_city_id: $departure_city_id
    delivery_city_id: $delivery_city_id
    whereDepartureCity: $whereDepartureCity
    status: $status
    orderBy: $orderBy
    scoutOrderBy: $scoutOrderBy
    where: $where
    whereVehicle: $whereVehicle
    hasFuel: $hasFuel
    hasFerry: $hasFerry
    defaultOrder: $defaultOrder
  ) {
    data {
      id
      created_at
      line {
        reference
      }
      status
      count
      available_from_date
      available_to_date
      currency
      hire_unit_type
      hire_unit_rate
      hire_units_allowed
      extra_hire_units_allowed
      extra_hire_unit_rate
      seatbelts
      measurement
      distance_allowed
      booking_fee_amount
      latest_departure_date
      deliveryCity {
        id
        name
        state
        region
      }
      departureCity {
        id
        name
        state
        region
      }
      vehicle {
        id
        type
        name
        heroImage
        code
        transmission
        images {
          ...MediaFields
        }
      }
      supplier {
        id
        name
        minimum_age
        age_surcharge_amount
        minimum_no_surcharge_age
      }
      inclusions {
        id
        type
        description
        value
        is_acknowledgment_required
      }
    }
    paginatorInfo {
      total
      lastPage
      currentPage
      count
      hasMorePages
      perPage
    }
  }
}

fragment MediaFields on Media {
  id
  url
  name
  file_name
  collection_name
  order_column
  is_system_generated
  created_at
  conversions {
    type
    url
    srcset
  }
}`;
