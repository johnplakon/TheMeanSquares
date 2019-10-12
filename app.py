from flask import Flask, render_template,request
import plotly
import plotly.graph_objs as go
import json
import tablib
import os
import pandas as pd

app = Flask(__name__)
dataset = tablib.Dataset()
with open(os.path.join(os.path.dirname(__file__),'vgsales.csv')) as f:
    dataset.csv = f.read()

df = pd.read_csv('vgsales.csv')

def create_plot(feature):
    if feature == 'Bar':
        data = [go.Bar(
            x = df["Genre"].values.tolist(), 
            y = df["NA_Sales"].values.tolist(),
            name='Sales In North America'
        )]
    elif feature == 'Bar2':
        data = [go.Bar(
            x = df["Genre"].values.tolist(), 
            y = df["Other_Sales"].values.tolist(),
            name='Other Sales',
            marker=dict(
                color='rgb(255,127,14,255)',
            )
        )]
    elif feature == 'Bar3':
        data = [go.Bar(
        x = df["Genre"].values.tolist(), 
        y = df["JP_Sales"].values.tolist(), 
        name='Sales in Japan',
        marker=dict(
            color='rgb(44,160,44,255)',
        )
    )]
    elif feature == 'Bar4':
        data= [go.Bar(
            x = df["Genre"].values.tolist(), 
            y = df["PAL_Sales"].values.tolist(),
            name='PAL Sales',
            marker=dict(
                color='rgb(214,39,40,255)',
        )
    )]
    else:
        data = [go.Bar(
            x = df["Genre"].values.tolist(), 
            y = df["Global_Sales"].values.tolist(), 
            name='Total worldwide sales',
            marker=dict(
                color='rgb(148,53,193,255)',
        )
    )]


    layout = go.Layout(
        title='Video Game Sales in 2018',
        xaxis=dict(
            tickfont=dict(
                size=14,
                color='rgb(107, 107, 107)'
            )
        ),
        yaxis=dict(
            title='USD (millions)',
            titlefont=dict(
                size=16,
                color='rgb(107, 107, 107)'
            ),
            tickfont=dict(
                size=14,
                color='rgb(107, 107, 107)'
            )
        ),
        barmode='group',
    )
    fig = go.Figure(data=data, layout=layout)

    graphJSON = json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)
    return graphJSON


@app.route('/')
def index():
    feature = 'Bar'
    bar = create_plot(feature)
    data = dataset.html
    #return dataset.html
    return render_template('index.html', plot=bar, data=data)

@app.route('/bar', methods=['GET', 'POST'])
def change_features():
    feature = request.args['selected']
    graphJSON = create_plot(feature)


    return graphJSON


if __name__ == '__main__':
    app.run(debug=True)
