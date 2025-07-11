import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Heart, MessageCircle, Share2, Plus, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import type { CommunityPost, CommunityComment } from "@shared/schema";

export default function Community() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedPost, setSelectedPost] = useState<CommunityPost | null>(null);
  const [newPostData, setNewPostData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    productId: ""
  });
  const [newComment, setNewComment] = useState("");

  const { data: posts, isLoading: postsLoading } = useQuery({
    queryKey: ["/api/community/posts"],
    queryFn: () => api.getCommunityPosts(),
  });

  const { data: comments, isLoading: commentsLoading } = useQuery({
    queryKey: ["/api/community/posts", selectedPost?.id, "comments"],
    queryFn: () => selectedPost ? api.getCommunityComments(selectedPost.id) : Promise.resolve([]),
    enabled: !!selectedPost,
  });

  const { data: products } = useQuery({
    queryKey: ["/api/products"],
    queryFn: () => api.getProducts(),
  });

  const createPostMutation = useMutation({
    mutationFn: (postData: any) => api.createCommunityPost(postData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/community/posts"] });
      setNewPostData({ title: "", description: "", imageUrl: "", productId: "" });
      toast({
        title: "게시물 작성 완료",
        description: "커뮤니티에 게시물이 등록되었습니다.",
      });
    },
    onError: () => {
      toast({
        title: "게시물 작성 실패",
        description: "게시물 작성 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    },
  });

  const likePostMutation = useMutation({
    mutationFn: (postId: number) => api.likeCommunityPost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/community/posts"] });
    },
  });

  const createCommentMutation = useMutation({
    mutationFn: ({ postId, comment }: { postId: number; comment: string }) => 
      api.createCommunityComment(postId, { userId: 1, comment }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/community/posts", selectedPost?.id, "comments"] });
      setNewComment("");
    },
  });

  const handleCreatePost = () => {
    if (!newPostData.title || !newPostData.imageUrl) {
      toast({
        title: "입력 오류",
        description: "제목과 이미지는 필수 항목입니다.",
        variant: "destructive",
      });
      return;
    }

    createPostMutation.mutate({
      ...newPostData,
      userId: 1, // Mock user ID
      productId: newPostData.productId ? parseInt(newPostData.productId) : undefined,
    });
  };

  const handleLikePost = (postId: number) => {
    likePostMutation.mutate(postId);
  };

  const handleCreateComment = () => {
    if (!newComment.trim() || !selectedPost) return;
    
    createCommentMutation.mutate({
      postId: selectedPost.id,
      comment: newComment,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              커뮤니티 갤러리
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              사용자들이 제작한 창작물을 구경하고 영감을 받아보세요
            </p>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button className="btn-primary">
                  <Plus className="h-4 w-4 mr-2" />
                  작품 공유하기
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>새 작품 공유하기</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">제목 *</Label>
                    <Input
                      id="title"
                      value={newPostData.title}
                      onChange={(e) => setNewPostData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="작품 제목을 입력하세요"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description">설명</Label>
                    <Textarea
                      id="description"
                      value={newPostData.description}
                      onChange={(e) => setNewPostData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="작품에 대한 설명을 입력하세요"
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="imageUrl">이미지 URL *</Label>
                    <Input
                      id="imageUrl"
                      value={newPostData.imageUrl}
                      onChange={(e) => setNewPostData(prev => ({ ...prev, imageUrl: e.target.value }))}
                      placeholder="이미지 URL을 입력하세요"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="productId">관련 제품 (선택)</Label>
                    <Select
                      value={newPostData.productId}
                      onValueChange={(value) => setNewPostData(prev => ({ ...prev, productId: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="관련 제품을 선택하세요" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">선택 안함</SelectItem>
                        {products?.map((product: any) => (
                          <SelectItem key={product.id} value={product.id.toString()}>
                            {product.nameKo}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button 
                    onClick={handleCreatePost}
                    className="w-full btn-primary"
                    disabled={createPostMutation.isPending}
                  >
                    {createPostMutation.isPending ? "작성 중..." : "작품 공유하기"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {postsLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="overflow-hidden animate-pulse">
                <div className="h-48 bg-muted"></div>
                <CardContent className="p-4">
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-6 bg-muted rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {posts?.map((post: CommunityPost) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div 
                  onClick={() => setSelectedPost(post)}
                  className="relative"
                >
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="bg-black/70 text-white">
                      작품
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  {post.description && (
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {post.description}
                    </p>
                  )}
                </CardContent>
                
                <CardFooter className="p-4 pt-0">
                  <div className="flex items-center justify-between w-full">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLikePost(post.id);
                      }}
                      className="flex items-center text-accent hover:text-red-600 transition-colors"
                    >
                      <Heart className="h-4 w-4 mr-1" />
                      <span className="text-sm">{post.likes || 0}</span>
                    </button>
                    
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setSelectedPost(post)}
                        className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <MessageCircle className="h-4 w-4 mr-1" />
                        <span className="text-sm">댓글</span>
                      </button>
                      
                      <button className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Post Detail Modal */}
      {selectedPost && (
        <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
          <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span>{selectedPost.title}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedPost(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <img
                src={selectedPost.imageUrl}
                alt={selectedPost.title}
                className="w-full h-64 object-cover rounded-lg"
              />
              
              {selectedPost.description && (
                <p className="text-muted-foreground">
                  {selectedPost.description}
                </p>
              )}
              
              <div className="flex items-center justify-between">
                <button
                  onClick={() => handleLikePost(selectedPost.id)}
                  className="flex items-center text-accent hover:text-red-600 transition-colors"
                >
                  <Heart className="h-5 w-5 mr-2" />
                  <span>{selectedPost.likes || 0}개의 좋아요</span>
                </button>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-1" />
                    공유
                  </Button>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3">댓글</h4>
                
                {/* Comment Input */}
                <div className="flex gap-2 mb-4">
                  <Input
                    placeholder="댓글을 입력하세요..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleCreateComment()}
                  />
                  <Button
                    onClick={handleCreateComment}
                    disabled={!newComment.trim() || createCommentMutation.isPending}
                  >
                    등록
                  </Button>
                </div>
                
                {/* Comments List */}
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {commentsLoading ? (
                    <div className="space-y-2">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-12 bg-muted rounded animate-pulse" />
                      ))}
                    </div>
                  ) : comments?.length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">
                      첫 번째 댓글을 작성해보세요!
                    </p>
                  ) : (
                    comments?.map((comment: CommunityComment) => (
                      <div key={comment.id} className="bg-muted/50 rounded-lg p-3">
                        <p className="text-sm text-foreground">
                          {comment.comment}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(comment.createdAt).toLocaleDateString('ko-KR')}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
