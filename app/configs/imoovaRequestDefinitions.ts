export const definitions = [
  {
    "kind": "OperationDefinition",
    "operation": "query",
    "name": {
      "kind": "Name",
      "value": "RelocationList"
    },
    "variableDefinitions": [
      {
        "kind": "VariableDefinition",
        "variable": {
          "kind": "Variable",
          "name": {
            "kind": "Name",
            "value": "first"
          }
        },
        "type": {
          "kind": "NonNullType",
          "type": {
            "kind": "NamedType",
            "name": {
              "kind": "Name",
              "value": "Int"
            }
          }
        }
      },
      {
        "kind": "VariableDefinition",
        "variable": {
          "kind": "Variable",
          "name": {
            "kind": "Name",
            "value": "page"
          }
        },
        "type": {
          "kind": "NamedType",
          "name": {
            "kind": "Name",
            "value": "Int"
          }
        }
      },
      {
        "kind": "VariableDefinition",
        "variable": {
          "kind": "Variable",
          "name": {
            "kind": "Name",
            "value": "search"
          }
        },
        "type": {
          "kind": "NamedType",
          "name": {
            "kind": "Name",
            "value": "String"
          }
        }
      },
      {
        "kind": "VariableDefinition",
        "variable": {
          "kind": "Variable",
          "name": {
            "kind": "Name",
            "value": "region"
          }
        },
        "type": {
          "kind": "NamedType",
          "name": {
            "kind": "Name",
            "value": "Region"
          }
        }
      },
      {
        "kind": "VariableDefinition",
        "variable": {
          "kind": "Variable",
          "name": {
            "kind": "Name",
            "value": "supplier_id"
          }
        },
        "type": {
          "kind": "NamedType",
          "name": {
            "kind": "Name",
            "value": "ID"
          }
        }
      },
      {
        "kind": "VariableDefinition",
        "variable": {
          "kind": "Variable",
          "name": {
            "kind": "Name",
            "value": "departure_city_id"
          }
        },
        "type": {
          "kind": "NamedType",
          "name": {
            "kind": "Name",
            "value": "ID"
          }
        }
      },
      {
        "kind": "VariableDefinition",
        "variable": {
          "kind": "Variable",
          "name": {
            "kind": "Name",
            "value": "delivery_city_id"
          }
        },
        "type": {
          "kind": "NamedType",
          "name": {
            "kind": "Name",
            "value": "ID"
          }
        }
      },
      {
        "kind": "VariableDefinition",
        "variable": {
          "kind": "Variable",
          "name": {
            "kind": "Name",
            "value": "status"
          }
        },
        "type": {
          "kind": "ListType",
          "type": {
            "kind": "NonNullType",
            "type": {
              "kind": "NamedType",
              "name": {
                "kind": "Name",
                "value": "RelocationStatus"
              }
            }
          }
        }
      },
      {
        "kind": "VariableDefinition",
        "variable": {
          "kind": "Variable",
          "name": {
            "kind": "Name",
            "value": "orderBy"
          }
        },
        "type": {
          "kind": "ListType",
          "type": {
            "kind": "NonNullType",
            "type": {
              "kind": "NamedType",
              "name": {
                "kind": "Name",
                "value": "QueryRelocationsOrderByRelationOrderByClause"
              }
            }
          }
        }
      },
      {
        "kind": "VariableDefinition",
        "variable": {
          "kind": "Variable",
          "name": {
            "kind": "Name",
            "value": "scoutOrderBy"
          }
        },
        "type": {
          "kind": "ListType",
          "type": {
            "kind": "NonNullType",
            "type": {
              "kind": "NamedType",
              "name": {
                "kind": "Name",
                "value": "QueryRelocationsScoutOrderByOrderByClause"
              }
            }
          }
        }
      },
      {
        "kind": "VariableDefinition",
        "variable": {
          "kind": "Variable",
          "name": {
            "kind": "Name",
            "value": "where"
          }
        },
        "type": {
          "kind": "NamedType",
          "name": {
            "kind": "Name",
            "value": "QueryRelocationsWhereWhereConditions"
          }
        }
      },
      {
        "kind": "VariableDefinition",
        "variable": {
          "kind": "Variable",
          "name": {
            "kind": "Name",
            "value": "whereVehicle"
          }
        },
        "type": {
          "kind": "NamedType",
          "name": {
            "kind": "Name",
            "value": "QueryRelocationsWhereVehicleWhereHasConditions"
          }
        }
      },
      {
        "kind": "VariableDefinition",
        "variable": {
          "kind": "Variable",
          "name": {
            "kind": "Name",
            "value": "whereDepartureCity"
          }
        },
        "type": {
          "kind": "NamedType",
          "name": {
            "kind": "Name",
            "value": "QueryRelocationsWhereDepartureCityWhereHasConditions"
          }
        }
      },
      {
        "kind": "VariableDefinition",
        "variable": {
          "kind": "Variable",
          "name": {
            "kind": "Name",
            "value": "hasFuel"
          }
        },
        "type": {
          "kind": "NamedType",
          "name": {
            "kind": "Name",
            "value": "Boolean"
          }
        }
      },
      {
        "kind": "VariableDefinition",
        "variable": {
          "kind": "Variable",
          "name": {
            "kind": "Name",
            "value": "hasFerry"
          }
        },
        "type": {
          "kind": "NamedType",
          "name": {
            "kind": "Name",
            "value": "Boolean"
          }
        }
      },
      {
        "kind": "VariableDefinition",
        "variable": {
          "kind": "Variable",
          "name": {
            "kind": "Name",
            "value": "defaultOrder"
          }
        },
        "type": {
          "kind": "NamedType",
          "name": {
            "kind": "Name",
            "value": "Boolean"
          }
        }
      }
    ],
    "selectionSet": {
      "kind": "SelectionSet",
      "selections": [
        {
          "kind": "Field",
          "name": {
            "kind": "Name",
            "value": "relocations"
          },
          "arguments": [
            {
              "kind": "Argument",
              "name": {
                "kind": "Name",
                "value": "first"
              },
              "value": {
                "kind": "Variable",
                "name": {
                  "kind": "Name",
                  "value": "first"
                }
              }
            },
            {
              "kind": "Argument",
              "name": {
                "kind": "Name",
                "value": "page"
              },
              "value": {
                "kind": "Variable",
                "name": {
                  "kind": "Name",
                  "value": "page"
                }
              }
            },
            {
              "kind": "Argument",
              "name": {
                "kind": "Name",
                "value": "search"
              },
              "value": {
                "kind": "Variable",
                "name": {
                  "kind": "Name",
                  "value": "search"
                }
              }
            },
            {
              "kind": "Argument",
              "name": {
                "kind": "Name",
                "value": "supplier_id"
              },
              "value": {
                "kind": "Variable",
                "name": {
                  "kind": "Name",
                  "value": "supplier_id"
                }
              }
            },
            {
              "kind": "Argument",
              "name": {
                "kind": "Name",
                "value": "region"
              },
              "value": {
                "kind": "Variable",
                "name": {
                  "kind": "Name",
                  "value": "region"
                }
              }
            },
            {
              "kind": "Argument",
              "name": {
                "kind": "Name",
                "value": "departure_city_id"
              },
              "value": {
                "kind": "Variable",
                "name": {
                  "kind": "Name",
                  "value": "departure_city_id"
                }
              }
            },
            {
              "kind": "Argument",
              "name": {
                "kind": "Name",
                "value": "delivery_city_id"
              },
              "value": {
                "kind": "Variable",
                "name": {
                  "kind": "Name",
                  "value": "delivery_city_id"
                }
              }
            },
            {
              "kind": "Argument",
              "name": {
                "kind": "Name",
                "value": "whereDepartureCity"
              },
              "value": {
                "kind": "Variable",
                "name": {
                  "kind": "Name",
                  "value": "whereDepartureCity"
                }
              }
            },
            {
              "kind": "Argument",
              "name": {
                "kind": "Name",
                "value": "status"
              },
              "value": {
                "kind": "Variable",
                "name": {
                  "kind": "Name",
                  "value": "status"
                }
              }
            },
            {
              "kind": "Argument",
              "name": {
                "kind": "Name",
                "value": "orderBy"
              },
              "value": {
                "kind": "Variable",
                "name": {
                  "kind": "Name",
                  "value": "orderBy"
                }
              }
            },
            {
              "kind": "Argument",
              "name": {
                "kind": "Name",
                "value": "scoutOrderBy"
              },
              "value": {
                "kind": "Variable",
                "name": {
                  "kind": "Name",
                  "value": "scoutOrderBy"
                }
              }
            },
            {
              "kind": "Argument",
              "name": {
                "kind": "Name",
                "value": "where"
              },
              "value": {
                "kind": "Variable",
                "name": {
                  "kind": "Name",
                  "value": "where"
                }
              }
            },
            {
              "kind": "Argument",
              "name": {
                "kind": "Name",
                "value": "whereVehicle"
              },
              "value": {
                "kind": "Variable",
                "name": {
                  "kind": "Name",
                  "value": "whereVehicle"
                }
              }
            },
            {
              "kind": "Argument",
              "name": {
                "kind": "Name",
                "value": "hasFuel"
              },
              "value": {
                "kind": "Variable",
                "name": {
                  "kind": "Name",
                  "value": "hasFuel"
                }
              }
            },
            {
              "kind": "Argument",
              "name": {
                "kind": "Name",
                "value": "hasFerry"
              },
              "value": {
                "kind": "Variable",
                "name": {
                  "kind": "Name",
                  "value": "hasFerry"
                }
              }
            },
            {
              "kind": "Argument",
              "name": {
                "kind": "Name",
                "value": "defaultOrder"
              },
              "value": {
                "kind": "Variable",
                "name": {
                  "kind": "Name",
                  "value": "defaultOrder"
                }
              }
            }
          ],
          "selectionSet": {
            "kind": "SelectionSet",
            "selections": [
              {
                "kind": "Field",
                "name": {
                  "kind": "Name",
                  "value": "data"
                },
                "selectionSet": {
                  "kind": "SelectionSet",
                  "selections": [
                    {
                      "kind": "Field",
                      "name": {
                        "kind": "Name",
                        "value": "id"
                      }
                    },
                    {
                      "kind": "Field",
                      "name": {
                        "kind": "Name",
                        "value": "created_at"
                      }
                    },
                    {
                      "kind": "Field",
                      "name": {
                        "kind": "Name",
                        "value": "line"
                      },
                      "selectionSet": {
                        "kind": "SelectionSet",
                        "selections": [
                          {
                            "kind": "Field",
                            "name": {
                              "kind": "Name",
                              "value": "reference"
                            }
                          }
                        ]
                      }
                    },
                    {
                      "kind": "Field",
                      "name": {
                        "kind": "Name",
                        "value": "status"
                      }
                    },
                    {
                      "kind": "Field",
                      "name": {
                        "kind": "Name",
                        "value": "count"
                      }
                    },
                    {
                      "kind": "Field",
                      "name": {
                        "kind": "Name",
                        "value": "available_from_date"
                      }
                    },
                    {
                      "kind": "Field",
                      "name": {
                        "kind": "Name",
                        "value": "available_to_date"
                      }
                    },
                    {
                      "kind": "Field",
                      "name": {
                        "kind": "Name",
                        "value": "currency"
                      }
                    },
                    {
                      "kind": "Field",
                      "name": {
                        "kind": "Name",
                        "value": "hire_unit_type"
                      }
                    },
                    {
                      "kind": "Field",
                      "name": {
                        "kind": "Name",
                        "value": "hire_unit_rate"
                      }
                    },
                    {
                      "kind": "Field",
                      "name": {
                        "kind": "Name",
                        "value": "hire_units_allowed"
                      }
                    },
                    {
                      "kind": "Field",
                      "name": {
                        "kind": "Name",
                        "value": "extra_hire_units_allowed"
                      }
                    },
                    {
                      "kind": "Field",
                      "name": {
                        "kind": "Name",
                        "value": "extra_hire_unit_rate"
                      }
                    },
                    {
                      "kind": "Field",
                      "name": {
                        "kind": "Name",
                        "value": "seatbelts"
                      }
                    },
                    {
                      "kind": "Field",
                      "name": {
                        "kind": "Name",
                        "value": "measurement"
                      }
                    },
                    {
                      "kind": "Field",
                      "name": {
                        "kind": "Name",
                        "value": "distance_allowed"
                      }
                    },
                    {
                      "kind": "Field",
                      "name": {
                        "kind": "Name",
                        "value": "booking_fee_amount"
                      }
                    },
                    {
                      "kind": "Field",
                      "name": {
                        "kind": "Name",
                        "value": "latest_departure_date"
                      }
                    },
                    {
                      "kind": "Field",
                      "name": {
                        "kind": "Name",
                        "value": "deliveryCity"
                      },
                      "selectionSet": {
                        "kind": "SelectionSet",
                        "selections": [
                          {
                            "kind": "Field",
                            "name": {
                              "kind": "Name",
                              "value": "id"
                            }
                          },
                          {
                            "kind": "Field",
                            "name": {
                              "kind": "Name",
                              "value": "name"
                            }
                          },
                          {
                            "kind": "Field",
                            "name": {
                              "kind": "Name",
                              "value": "state"
                            }
                          },
                          {
                            "kind": "Field",
                            "name": {
                              "kind": "Name",
                              "value": "region"
                            }
                          }
                        ]
                      }
                    },
                    {
                      "kind": "Field",
                      "name": {
                        "kind": "Name",
                        "value": "departureCity"
                      },
                      "selectionSet": {
                        "kind": "SelectionSet",
                        "selections": [
                          {
                            "kind": "Field",
                            "name": {
                              "kind": "Name",
                              "value": "id"
                            }
                          },
                          {
                            "kind": "Field",
                            "name": {
                              "kind": "Name",
                              "value": "name"
                            }
                          },
                          {
                            "kind": "Field",
                            "name": {
                              "kind": "Name",
                              "value": "state"
                            }
                          },
                          {
                            "kind": "Field",
                            "name": {
                              "kind": "Name",
                              "value": "region"
                            }
                          }
                        ]
                      }
                    },
                    {
                      "kind": "Field",
                      "name": {
                        "kind": "Name",
                        "value": "vehicle"
                      },
                      "selectionSet": {
                        "kind": "SelectionSet",
                        "selections": [
                          {
                            "kind": "Field",
                            "name": {
                              "kind": "Name",
                              "value": "id"
                            }
                          },
                          {
                            "kind": "Field",
                            "name": {
                              "kind": "Name",
                              "value": "type"
                            }
                          },
                          {
                            "kind": "Field",
                            "name": {
                              "kind": "Name",
                              "value": "name"
                            }
                          },
                          {
                            "kind": "Field",
                            "name": {
                              "kind": "Name",
                              "value": "heroImage"
                            }
                          },
                          {
                            "kind": "Field",
                            "name": {
                              "kind": "Name",
                              "value": "code"
                            }
                          },
                          {
                            "kind": "Field",
                            "name": {
                              "kind": "Name",
                              "value": "transmission"
                            }
                          }
                        ]
                      }
                    },
                    {
                      "kind": "Field",
                      "name": {
                        "kind": "Name",
                        "value": "supplier"
                      },
                      "selectionSet": {
                        "kind": "SelectionSet",
                        "selections": [
                          {
                            "kind": "Field",
                            "name": {
                              "kind": "Name",
                              "value": "id"
                            }
                          },
                          {
                            "kind": "Field",
                            "name": {
                              "kind": "Name",
                              "value": "name"
                            }
                          },
                          {
                            "kind": "Field",
                            "name": {
                              "kind": "Name",
                              "value": "minimum_age"
                            }
                          },
                          {
                            "kind": "Field",
                            "name": {
                              "kind": "Name",
                              "value": "age_surcharge_amount"
                            }
                          },
                          {
                            "kind": "Field",
                            "name": {
                              "kind": "Name",
                              "value": "minimum_no_surcharge_age"
                            }
                          }
                        ]
                      }
                    },
                    {
                      "kind": "Field",
                      "name": {
                        "kind": "Name",
                        "value": "inclusions"
                      },
                      "selectionSet": {
                        "kind": "SelectionSet",
                        "selections": [
                          {
                            "kind": "Field",
                            "name": {
                              "kind": "Name",
                              "value": "id"
                            }
                          },
                          {
                            "kind": "Field",
                            "name": {
                              "kind": "Name",
                              "value": "type"
                            }
                          },
                          {
                            "kind": "Field",
                            "name": {
                              "kind": "Name",
                              "value": "description"
                            }
                          },
                          {
                            "kind": "Field",
                            "name": {
                              "kind": "Name",
                              "value": "value"
                            }
                          },
                          {
                            "kind": "Field",
                            "name": {
                              "kind": "Name",
                              "value": "is_acknowledgment_required"
                            }
                          }
                        ]
                      }
                    }
                  ]
                }
              },
              {
                "kind": "Field",
                "name": {
                  "kind": "Name",
                  "value": "paginatorInfo"
                },
                "selectionSet": {
                  "kind": "SelectionSet",
                  "selections": [
                    {
                      "kind": "Field",
                      "name": {
                        "kind": "Name",
                        "value": "total"
                      }
                    },
                    {
                      "kind": "Field",
                      "name": {
                        "kind": "Name",
                        "value": "lastPage"
                      }
                    },
                    {
                      "kind": "Field",
                      "name": {
                        "kind": "Name",
                        "value": "currentPage"
                      }
                    },
                    {
                      "kind": "Field",
                      "name": {
                        "kind": "Name",
                        "value": "count"
                      }
                    },
                    {
                      "kind": "Field",
                      "name": {
                        "kind": "Name",
                        "value": "hasMorePages"
                      }
                    },
                    {
                      "kind": "Field",
                      "name": {
                        "kind": "Name",
                        "value": "perPage"
                      }
                    }
                  ]
                }
              }
            ]
          }
        }
      ]
    }
  }
];
