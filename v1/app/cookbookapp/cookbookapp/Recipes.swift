//
//  Recipes.swift
//  cookbookapp
//
//  Created by Kevin Buhler on 6/16/22.
//

import Foundation


struct Recipes: Codable, Hashable {
    let title: String
    let description: String
    let created_at: String
    let is_public: Bool
}
