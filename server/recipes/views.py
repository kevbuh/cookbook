
# Create your views here.
from recipes.models import Recipes
from recipes.serializers import RecipesSerializer
from rest_framework.decorators import action
from rest_framework import filters, generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework.viewsets import ModelViewSet
from .serializers import RecipesSerializer, ReviewSerializer, LikedPostSerializer, CommentSerializer, UploadedImageSerializer
from .models import Recipes, Review, Favorites, Comment, UploadedImage
from rest_framework.parsers import MultiPartParser


class RecipeViewSet(ModelViewSet):
    serializer_class = RecipesSerializer
    queryset = Recipes.objects.all()

    @action(detail=False)
    def get_list(self, request):
        pass
      
    @action(detail=True)
    def get_recipes(self, request, pk=None):
        pass

    @action(detail=True, methods=['post', 'delete'])
    def delete_recipes(self, request, pk=None):
        pass

class SearchResultsList(generics.ListCreateAPIView):
    filter_backends = (filters.SearchFilter,)
    search_fields = ['description', 'title']
    serializer_class = RecipesSerializer
    queryset = Recipes.objects.all()

class RatingViewSet(ModelViewSet):
    """
    A simple ViewSet for viewing and editing accounts.
    """
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    # permission_classes = [IsAccountAdminOrReadOnly]

class LikeRecipeViewSet(ModelViewSet):
    queryset = Favorites.objects.all()
    serializer_class = LikedPostSerializer

class CommentViewSet(ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class UploadedImageViewSet(ModelViewSet):
    queryset = UploadedImage.objects.all()
    serializer_class = UploadedImageSerializer

# class UploadedImageViewSet(generics.ListAPIView):
#     # parser_classes = (MultiPartParser,)
#     queryset = UploadedImage.objects.all()
#     serializer_class = UploadedImageSerializer

#     def post(self, request, *args, **kwargs):
#         file = request.data['file']
#         image = UploadedImage.objects.create(image=file)
#         return Response(
#                 {'message': "Uploaded"},
#                 status=status.HTTP_200_OK
#             )




# class GetImagesView(APIView):
#     def get(self, request, format=None):
#         if UploadedImage.objects.all().exists():
#             images = UploadedImage.objects.all()
#             images = UploadedImageSerializer(images, many=True)

#             return Response(
#                 {'images': images.data},
#                 status=status.HTTP_200_OK
#             )
#         else:
#             return Response(
#                 {'error': 'No images found'},
#                 status=status.HTTP_404_NOT_FOUND
#             )


# class ImageUploadView(APIView):
#     def post(self, request):
#         try:
#             print("DJANGO IS TRYING1")

#             data = self.request.data

#             print("DJANGO IS TRYING2")
#             print(data)
#             image = data['img']
#             user = data['user'] 
#             recipe = data['recipe']

#             print("IMAGEDJANOG",image)
#             print("USRE DJANOG",user)
#             print("RECIPE DJANOG",recipe)

#             UploadedImage.objects.create(
#                 img=image,
#                 user=user,
#                 recipe=recipe
#             )

#             return Response(
#                 {'success': 'Successfully uploaded image'},
#                 status=status.HTTP_201_CREATED
#             )
#         except:
#             print("DJANGO DATA WAS FAILED TRY CATCH:::")
#             return Response(
#                 {'error': 'Something went wrong when uploading image, from DJANGO'},
#                 status=status.HTTP_500_INTERNAL_SERVER_ERROR,
#             )