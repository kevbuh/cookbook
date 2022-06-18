//
//  ContentView.swift
//  cookbookapp
//
//  Created by Kevin Buhler on 6/16/22.
//

import SwiftUI

struct ContentView: View {
    @State var recipes = [Recipes]()
    var body: some View {
        ForEach(recipes, id: \.self) {item in
            HStack {
                Image(systemName: "banknote").foregroundColor(.green)
                Text(item.title)
                Spacer()
                Text("\(item.description)")
            }
        }.onAppear(perform: loadRecipes)
    }
    
    // url string is the endpoint for out API
    func loadRecipes(){
        guard let url = URL(string: "http://127.0.0.1:8000/recipes/") else {
            print("api is down")
            return
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = "GET"
        request.addValue("application/json", forHTTPHeaderField: "Accept")
        URLSession.shared.dataTask(with: request) {
            data, response, error in if let data = data {
                if let response = try? JSONDecoder().decode([Recipes].self, from: data) {
                    DispatchQueue.main.async {
                        self.recipes = response
                    }
                    return
                }
            }
        }.resume()
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
