exports.utils = {
    shuffle: function n(data) {
        data.sort((a, b) => 0.5 - Math.random());
    },
    showUsers : function(users){
        let html = '<ul>';
        for(const user of users){
            html += `<li>${user}</li>`
        }
        html += '</ul>';

        return html;
    }
}